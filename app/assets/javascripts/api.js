window.API = (function() {
  var start = "https://www.googleapis.com/books/v1/volumes"
  var allBooks = "https://www.googleapis.com/books/v1/volumes?q=Best%20Selling&maxResults=";
  var max = "&maxResults=";
  var search = "&searchIndex=";

  var getAll = function(callback,num) {
    $.get(allBooks+num,callback);
  };

  var concatBooksAll = function(callback,num,index) {
    $.get(allBooks+num+"&startIndex="+index,callback);
  };

  var concatBooks = function(topic,callback,num,index) {
    $.get(start+"?q="+topic+"&maxResults="+num+"&startIndex="+index,callback);
  };

  var find = function(topic,callback,num) {
    $.get(start+"?q="+topic+max+num,callback);
  };
  var find_id = function(id,callback) {
    $.get(start+"/"+id,callback);
  }

  return {
    getAll: getAll,
    find: find,
    find_id: find_id,
    concatBooksAll: concatBooksAll,
    concatBooks: concatBooks
  }
})();