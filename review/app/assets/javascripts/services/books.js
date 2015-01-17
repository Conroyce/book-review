// app.factory("Book",[function() {
//   var api = "AIzaSyD1xQ8m_sQA8m2wDDP6iroUlHf2ei2ehuc";
//   var start = "https://www.googleapis.com/books/v1/volumes"
//   var allBooks = "https://www.googleapis.com/books/v1/volumes?q=Fiction&maxResults=18";
  

//   var getAll = function() {
//     $http.get(allBooks).
//       success(function(data) {console.log(data);});
//   };

//   var find = function(topic) {
//     $http.get(start+"?q="+topic+"&maxResults=18&key="+api).
//       success(function(data) {console.log(data);});
//   };
//   var find_id = function(id,callback) {
//     $http.get(start+"/"+id).
//       success(function(data) {console.log(data);});
//   }

//   return {
//     getAll: getAll,
//     find: find,
//     find_id: find_id
//   }
// }])