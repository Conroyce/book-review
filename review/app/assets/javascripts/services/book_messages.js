app.factory("Messages",[function() {
  var createMessage = function(title,review,book_id) {
    var message = new Message({title:title,review: review, book_id: book_id});
    message.$save();
  };

  var getAll = function() {

  };

  return {
    create: createMessage,
    getAll: getAll
  }
}]);