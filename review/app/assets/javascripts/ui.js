var getBooks = function() {
  API.getAll(function(books) {
    var bookList = [];
    var counter = 0;
    books.items.forEach(function(book) {
      var ans = {};

      var checkTitle = book.volumeInfo.title.split("");
      if (checkTitle.length > 28) {
        ans.dispTitle = checkTitle.join("").substr(0,28)+"...";
        ans.title = book.volumeInfo.title;
      } else {
        ans.dispTitle = book.volumeInfo.title;
        ans.title = book.volumeInfo.title;
      }
      
      if (book.volumeInfo.imageLinks == undefined) {
        ans.img = "/mysterybook.jpg";
      } else {
        ans.img = book.volumeInfo.imageLinks.thumbnail;
      } 
      ans.authors = book.volumeInfo.authors;
      ans.description = book.volumeInfo.description;
      ans.id = book.id;

      bookList.push(ans);
      counter++;
    });

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
    $.post("/books", {book:{title: $title, book_id: $id} }).success(function(x) {
      
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
}
$(document).ready(function() {
  $('.main').on('click','.show-book',function(e) {
    var $this = this;
    var $id = $($this).children().children('input.bookId').val();
    var $title = $($this).children().children('input.bookTitle').val();

    $.post("/books", {book:{title: $title, book_id: $id}}).success(function(x) {
      API.find_id($id, function(data) {
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

      })
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




