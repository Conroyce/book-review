
API.getAll(function(books) {
  console.log(books)
  var bookList = [];
  books.items.forEach(function(book) {
    var ans = {};

    ans.title = book.volumeInfo.title;
    ans.img = book.volumeInfo.imageLinks.thumbnail;
    ans.authors = book.volumeInfo.authors;
    ans.description = book.volumeInfo.description;

    bookList.push(ans);
  });

  var source = $('#book-template').html();
  var template = Handlebars.compile(source);
  var html = template({books:bookList});

  $('.main').append(html);
});

$(document).ready(function() {
  $('.search-div').on('click','.searchButton',function() {
    var $text = $('#searchBox').val();
    $('#searchBox').val('');
    console.log($text);
    API.find($text,function(data) {
      console.log(data);
      var bookList = [];
      data.items.forEach(function(book) {
        var ans = {};

        ans.title = book.volumeInfo.title;
        ans.authors = book.volumeInfo.authors;
        ans.img = book.volumeInfo.imageLinks.thumbnail
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


