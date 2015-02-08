$(document).ready(function() {

  var booksObj = {};

  var getBooks = function(books) {
      booksObj = {};
      var bookList = [];
      var counter = 0;
      for (var i = 0; i < books.items.length; i++) {
        var ans = {};
        var bookItem = {}
        var checkTitle = books.items[i].volumeInfo.title.split("");

        if (checkTitle.length > 28) {
          ans.dispTitle = checkTitle.join("").substr(0,28)+"...";      
        } else {
          ans.dispTitle = books.items[i].volumeInfo.title;
        }
        
        if (books.items[i].volumeInfo.imageLinks == undefined) {
          ans.img = "/mysterybook.jpg";
          bookItem.img = "/mysterybook.jpg";
        } else {
          ans.img = books.items[i].volumeInfo.imageLinks.thumbnail;
          bookItem.img = books.items[i].volumeInfo.imageLinks.thumbnail;
        } 

        ans.authors = books.items[i].volumeInfo.authors;
        ans.description = books.items[i].volumeInfo.description;
        ans.id = books.items[i].id;
        ans.el = i;

        bookItem.description = books.items[i].volumeInfo.description;
        bookItem.book_id = books.items[i].id;
        bookItem.title = books.items[i].volumeInfo.title;
        bookItem.rating = books.items[i].volumeInfo.averageRating || "";
        bookItem.ratingCount = books.items[i].volumeInfo.ratingsCount || "";
        bookItem.link = books.items[i].accessInfo.webReaderLink;
        booksObj[i] = bookItem;

        bookList.push(ans);
        counter++;
      };

      var source = $('#book-template').html();
      var template = Handlebars.compile(source);
      var html = template({books:bookList});

      $('.main').html('')
      $('.main').append(html);
  };

  API.getAll(getBooks);

  var exec = function(func, context) {
    func.call(context);
  };

  $('.main').on('click','.addBook',function(e) {
    e.preventDefault();
    var $id = $(this).children('.bookId').val();
    var $title = $(this).children('.bookTitle').val();
    $.post("/books", {book: book }).success(function(x) { //CONTINUE HEREE!!!!!
      
      API.getAll(getBooks);
    })
  });

  $('.main').on('click','.show-book',function(e) {
    var $this = this;
    var $el = $($this).children().children("input.bookEl").val();
    var book = booksObj[$el];
    var img = book.img;

    $.post("/books", 
      {
        book:{
          title: book.title, 
          book_id: book.book_id, 
          rating: book.rating,
          ratingCount: book.ratingCount,
          description: book.description,
          link: book.link,
          img: img
        }  
      });
  })

  $('.search-div').on('click','.searchButton',function() {
    var $text = $('#searchBox').val();
    $('#searchBox').val('');
    API.find($text,getBooks);
  });

});


