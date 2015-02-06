var booksObj = {};

var getBooks = function() {
  API.getAll(function(books) {
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

    $('.main').append(html);
  });
};
getBooks();


$(document).ready(function() {
  $('.main').on('click','.addBook',function(e) {
    e.preventDefault();
    var $id = $(this).children('.bookId').val();
    var $title = $(this).children('.bookTitle').val();
    $.post("/books", {book: book }).success(function(x) { //CONTINUE HEREE!!!!!
      
      getBooks();
      // API.getAll(function(books) {
      //   console.log(books)
      //   var bookList = [];
      //   var counter = 0;
      //   books.items.forEach(function(book) {
      //     var ans = {};

      //     var checkTitle = book.volumeInfo.title.split("");
      //     if (checkTitle.length > 28) {
      //       ans.dispTitle = checkTitle.join("").substr(0,28)+"...";
      //       ans.title = book.volumeInfo.title;
      //     } else {
      //       ans.dispTitle = book.volumeInfo.title;
      //       ans.title = book.volumeInfo.title;
      //     }
      //     if (book.volumeInfo.imageLinks == undefined) {
      //       ans.img = "/mysterybook.jpg";
      //     } else {
      //       ans.img = book.volumeInfo.imageLinks.thumbnail;
      //     } 
      //     ans.authors = book.volumeInfo.authors;
      //     ans.description = book.volumeInfo.description;
      //     ans.id = book.id;

      //     bookList.push(ans);
      //     counter++;
      //   });

      //   var source = $('#book-template').html();
      //   var template = Handlebars.compile(source);
      //   var html = template({books:bookList});

      //   $('.main').append(html);
      // });
    })
  })
});

var exec = function(func, context) {
  func.call(context);
};

$(document).ready(function() {
  $('.main').on('click','.show-book',function(e) {
    var $this = this;
    var $el = $($this).children().children("input.bookEl").val();
    var book = booksObj[$el];
    var img = book.img || "/mysterybook.jpg";

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
      }).success(function(x) {
        console.log(x);
        API.find_id(book.book_id, function(data) {
          console.log(data);
          // var book = $.param({book:data});
          // $.get("/books"+$id,book,function(data) console.log(data););
          // $.ajax({
          //   type: "GET",
          //   url: "/books/"+$id,
          //   data: {book: "hey"},
          //   dataType: "json"
          // });
          var ans = {};
          ans.title = data.title;
          ans.id = data.id;

        });
    });
  })
})

$(document).ready(function() {
  $('.search-div').on('click','.searchButton',function() {
    var $text = $('#searchBox').val();
    $('#searchBox').val('');
    console.log($text);
    API.find($text,function(data) {
      // console.log(data + "api find");
      var bookList = [];
      data.items.forEach(function(book) {
        var ans = {};

        var checkTitle = book.volumeInfo.title.split("");
        if (checkTitle.length > 28) {
          ans.dispTitle = checkTitle.join("").substr(0,28)+"...";
          ans.title = book.volumeInfo.title;
        } else {
          ans.dispTitle = book.volumeInfo.title;
          ans.title = book.volumeInfo.title;
        }
        ans.authors = book.volumeInfo.authors;
        if (book.volumeInfo.imageLinks == undefined) {
          ans.img = "/mysterybook.jpg";
        } else {
          ans.img = book.volumeInfo.imageLinks.thumbnail;
        } 
        ans.id = book.id;
        bookList.push(ans);
      });

      var source = $('#book-template').html();
      var template = Handlebars.compile(source);
      var html = template({books:bookList})
     
      $('.main').html("");
      $('.main').append(html);
    });
  });
});

$(document).ready(function() {
  $('.container').on("click",".homeLink",function(e) {
    e.preventDefault();
    console.log("hey");
    getBooks();
  })
});



