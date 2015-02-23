var booksObj = {};

var descriptionParser = function(desc) {
  if (desc.length > 395) {
    return '<p>' + desc.substr(0,395) + '...<a class="desc-expand"> Show More </a></p><p class="desc-hidden">' + desc + ' <a class="desc-contract">Hide</a></p>';
  } else {
    return '<p>' + desc + '</p>';
  }
};

var paramsCheck = function() {
  var sPageURL = window.location.href.split('/');
  if (sPageURL[sPageURL.length-2] == "books") {
    API.find(sPageURL[sPageURL.length-1], 
      function(data) {
        var book = data.items[0];
        var description = descriptionParser(book.volumeInfo.description);
        $('.bookShowTitle').html(book.volumeInfo.title);
        $('.bookShowImg').html('<img width="100%" src="' + book.volumeInfo.imageLinks.thumbnail + '">');
        $('.bookShowRating').html('<strong>Rating:</strong> ' + book.volumeInfo.averageRating+ " / 5");
        $('.bookShowLink').html('<a href="' + book.accessInfo.webReaderLink + '" class="btn btn-primary">Read The Book</a>');
        $('.bookShowDesc').html("<strong>Overview - </strong>" + description);
        $('.bookShowAuthors').html("<strong>By</strong> " + book.volumeInfo.authors);
        $('.bookHiddenRating').html(
          '<input type="hidden" value="'+book.volumeInfo.averageRating+'" class="bookRating"><input type="hidden" value="'+book.volumeInfo.ratingsCount+'" class="bookCount">');
      });
  }
};

var getBooks = function(books) {
  booksObj = {};
  var bookList = [];
  for (var i = 0; i < books.items.length; i++) {
    var ans = {};
    var bookItem = {};
    var checkTitle = books.items[i].volumeInfo.title.split("");

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

    ans.authors = books.items[i].volumeInfo.authors;
    ans.description = books.items[i].volumeInfo.description;
    ans.id = books.items[i].id;
    ans.el = i;

    bookItem.book_id = books.items[i].id;
    bookItem.title = books.items[i].volumeInfo.title;
    booksObj[i] = bookItem;

    bookList.push(ans);
  };

  var source = $('#book-template').html();
  var template = Handlebars.compile(source);
  var html = template({books:bookList});

  $('.main').html('')
  $('.main').append(html);
};

var descExpand = function() {
  $('.tracker').on('click', '.desc-expand', function(e) {
    $(this).parent().next().css('display', 'inline');
    $(this).parent().hide();
  })
}

var descContract = function() {
  $('.tracker').on('click', '.desc-contract', function(e) {
    $(this).parent().prev().show();
    $(this).parent().hide();
  });
};

$(document).ready(function() { 

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

  $('.main').on('click','.show-book',function(e) {
    var $el = $(this).children().children("input.bookEl").val();
    var book = booksObj[$el];

    $.post("/books",{ book: { book_id: book.book_id } });
  });

  $('.search-div').on('submit',function(e) {
    e.preventDefault();
    var $text = $('#searchBox').val();
    $('#searchBox').val('');
    API.find($text,getBooks);
  });

  $('.addRating').on('click','.ratingSubmit',function(e) {
    console.log("hey");
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

  $('.desc-expand').on('click', function() {
    $('.desc-hidden').show();
  })
});


