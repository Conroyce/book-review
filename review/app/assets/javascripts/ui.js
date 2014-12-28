API.getAll(function(books) {
  console.log(books)
  var bookList = [];
  books.items.forEach(function(book) {
    var ans = {};

    ans.title = book.volumeInfo.title;
    ans.img = book.volumeInfo.thumbnail;
    ans.authors = book.volumeInfo.authors;

    bookList.push(ans)
  });

  var source = $('#book-template').html();
  var template = Handlebars.compile(source);
  var html = template({books:bookList});

  $('.main').append(html);
});