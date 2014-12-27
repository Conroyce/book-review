window.API = (function() {
  var api = "https://www.googleapis.com/books/v1/volumes?q=search+terms";

  var getBook = function(callback) {
    $.get(api,callback)
  };

  return {
    getBooks: getBook
  }
})();