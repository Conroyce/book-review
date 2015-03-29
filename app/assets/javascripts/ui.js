var booksObj = {};
var current = 18;
var num = 0;
var $text;


//limits the number of characters displayed for each boot title
var descriptionParser = function(desc) {
  if (desc.length > 395) {
    return '<p>' + desc.substr(0,395) + '...<a class="desc-expand"> Show More </a></p><p class="desc-hidden">' + desc + ' <a class="desc-contract">Hide</a></p>';
  } else {
    return '<p>' + desc + '</p>';
  }
};

//looks at url, grabs id from url, does get request and displays data
var paramsCheck = function() {
  //splits url in [address,books,book_id]
  var sPageURL = window.location.href.split('/');
  var id = sPageURL.length - 1;

  //check if id starts with "-" (this causes problems when searching)
  if (sPageURL[id][0] == "-") {
    sPageURL[id] = sPageURL[id].substr(1,sPageURL[id].length-1);
    console.log(sPageURL[id]);
  }  

  if (sPageURL[sPageURL.length-2] == "books") {
    API.find(sPageURL[id], 
      function(data) {
        var book = data.items[0];
        var description = book.volumeInfo.description;
        if (typeof description != "undefined") {
          description = descriptionParser(book.volumeInfo.description);
        } else {
          description = "N/A";
        }
        
        $('.bookShowTitle').html(book.volumeInfo.title);
        $('.bookShowImg').html('<img width="100%" src="' + book.volumeInfo.imageLinks.thumbnail + '">');
        $('.bookShowRating').html('<strong>Rating:</strong> ' + book.volumeInfo.averageRating+ " / 5");
        $('.bookShowLink').html('<a href="' + book.accessInfo.webReaderLink + '" class="btn btn-primary">Read The Book</a>');
        $('.bookShowDesc').html("<strong>Overview - </strong>" + description);
        $('.bookShowAuthors').html("<strong>By</strong> " + book.volumeInfo.authors);
        $('.bookHiddenRating').html(
          '<input type="hidden" value="'+book.volumeInfo.averageRating+'" class="bookRating"><input type="hidden" value="'+book.volumeInfo.ratingsCount+'" class="bookCount">');
      },1);
  }
};

//retrieves book info from api, displays info using handlebars
var getBooks = function(books) {

  var bookList = [];

  for (var i = 0; i < books.items.length; i++) {
    var ans = {};
    var bookItem = {};
    var checkTitle = books.items[i].volumeInfo.title.split("");
    var authors = books.items[i].volumeInfo.authors;

    if (checkTitle.length > 28) {
      ans.dispTitle = checkTitle.join("").substr(0,28)+"...";      
    } else {
      ans.dispTitle = books.items[i].volumeInfo.title;
    }
    
    if (books.items[i].volumeInfo.imageLinks == undefined) {
      ans.img = "/mysterybook.jpg";
    } else {
      ans.img = books.items[i].volumeInfo.imageLinks.thumbnail;
    } 

    if (typeof authors != "undefined") {
      if (authors.length > 1) {
        ans.authors = authors.join(", ");
      } else {
        ans.authors = authors;
      }
    }  
   
    ans.description = books.items[i].volumeInfo.description;
    ans.id = books.items[i].id;
    ans.el = num;

    bookItem.book_id = books.items[i].id;
    bookItem.title = books.items[i].volumeInfo.title;
    bookItem.img = ans.img;
    booksObj[num] = bookItem;
    num++;

    bookList.push(ans);
  };

  var source = $('#book-template').html();
  var template = Handlebars.compile(source);
  var html = template({books:bookList});

  $('.main').append(html);
};

//adds functionality to getBooks when searching. booksObj is reset when doing a search
var searchBooks = function(books) {
  booksObj = {};
  $('.main').html('');
  getBooks(books);
}

//expands description in books#show view
var descExpand = function() {
  $('.book-show').on('click', '.desc-expand', function(e) {
    $(this).parent().next().css('display', 'inline');
    $(this).parent().hide();
  })
}

//contracts description in books#show view
var descContract = function() {
  $('.book-show').on('click', '.desc-contract', function(e) {
    $(this).parent().prev().show();
    $(this).parent().hide();
  });
};

$(document).ready(function() { 
  //adds favorites
  $('.main').on('click','.addBook',function(e) {
    var $el = $(this).children("input.bookEl").val();
    var $userId = $(this).children("input.userId").val();
    var book = booksObj[$el];

    $.ajax({
      type: "POST",
      url: "/users/"+$userId+"/favorites",
      data: {
        favorite: {
          user_id: $userId, 
          book_id: book.book_id,
          img: book.img,
          title: book.title
        },
        book: { 
          book_id: book.book_id 
        }
      }
    });
  });

  //leads to #show view
  $('.main').on('click','.show-book',function(e) {
    var $el = $(this).children().children("input.bookEl").val();
    var book = booksObj[$el];
    $.post("/books",{ book: { book_id: book.book_id } });
  });

  //creates search functionality
  $('.search-div').on('submit',function(e) {
    e.preventDefault();
    booksObj= {};
    current = 18;
    $text = $('#searchBox').val();
    $('#searchBox').val('');
    API.find($text,searchBooks,18);
  });

  //add rating functionality
  $('.addRating').on('click','.ratingSubmit',function(e) {
    var sPageURL = window.location.href.split('/');
    var $count = $("input.bookCount").val();
    var $oldRating = $("input.bookRating").val();
    var $newRating = $('input:radio[name=rating]:checked').val();
    var $rating = ((($oldRating * $count) + $newRating)/($count+1));
    console.log($count,$oldRating,$newRating,$rating,$rating.toFixed(2));

    $.ajax({
      url: "/books/"+sPageURL[sPageURL.length-1],
      type: "PUT",
      data: {
        book_id: sPageURL[sPageURL.length-1],
        oldRating: $oldRating,
        newRating: $newRating,
        count: $count
      }
    });
  });

  //adds infinite scroll
  $(window).scroll(function() {
     if($(window).scrollTop() + $(window).height() == $(document).height()) {
        if ($text) {
          API.concatBooks($text,getBooks,12,current);
          current += 12;
        } else {
          API.concatBooksAll(getBooks,12,current);
          current += 12;
        }
     }
  });

  //shows complete description in books#show view
  $('.desc-expand').on('click', function() {
    $('.desc-hidden').show();
  })
});


