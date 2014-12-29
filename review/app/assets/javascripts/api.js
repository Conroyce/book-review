window.API = (function() {
  var api = "AIzaSyD1xQ8m_sQA8m2wDDP6iroUlHf2ei2ehuc";
  var start = "https://www.googleapis.com/books/v1/volumes?q="
  var allBooks = "https://www.googleapis.com/books/v1/volumes?q=search+terms";
  

  var getAll = function(callback) {
    $.get(allBooks,callback)
  };

  var find = function(topic,callback) {
    $.get(start+topic+"&key="+api,callback)
  };


  return {
    getAll: getAll,
    find: find
  }
})();