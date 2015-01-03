window.API = (function() {
  var api = "AIzaSyD1xQ8m_sQA8m2wDDP6iroUlHf2ei2ehuc";
  var start = "https://www.googleapis.com/books/v1/volumes"
  var allBooks = "https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=12";
  

  var getAll = function(callback) {
    $.get(allBooks,callback)
  };

  var find = function(topic,callback) {
    $.get(start+"?q="+topic+"&maxResults=12&key="+api,callback)
  };
  var find_id = function(id,callback) {
    $.get(start+"/"+id,callback)
  }

  return {
    getAll: getAll,
    find: find,
    find_id: find_id
  }
})();