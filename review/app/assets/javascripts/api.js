window.API = (function() {
  var allBooks = "https://www.googleapis.com/books/v1/volumes?q=search+terms";


  var getAll = function(callback) {
    $.get(allBooks,callback)
  };

  return {
    getAll: getAll
  }
})();