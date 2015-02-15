var booksObj = {};

var paramsCheck = function() {
  var sPageURL = window.location.href.split('/');
  if (sPageURL[sPageURL.length-2] == "books") {
  API.find(sPageURL[sPageURL.length-1], 
    function(data) {
      var book = data.items[0];
      console.log("paramsCheck",book);
      $('.bookShowTitle').html(book.volumeInfo.title);
      $('.bookShowImg').html('<img src="' + book.volumeInfo.imageLinks.thumbnail + '">');
      $('.bookShowRating').html('Average Rating: ' + book.volumeInfo.averageRating);
      $('.bookShowLink').html('<a href="' + book.accessInfo.webReaderLink + '" class="btn btn-primary">Read The Book</a>');
      $('.bookShowDesc').html(book.volumeInfo.description)
    });
  }
}

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

  $('.addRating').on('submit',function(e) {
    e.preventDefault();
    var $el = $(this).children("input.bookEl").val();
    var $count = $(this).children("input.bookCount").val();
    var $oldRating = $(this).children("input.bookRating").val();
    var $newRating = $('input:radio[name=rating]:checked').val();
    var $rating = (($oldRating * $count + $newRating)/($count+1)).toFixed(2);
    console.log($rating,$count,$newRating);

    $.ajax({
      url: "/books/"+$el,
      type: "PUT",
      data: {
        book: {
          book_id: $el,
          rating: $rating
        }
      }
    });
  });
});


