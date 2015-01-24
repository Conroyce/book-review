app.controller("BookCtrl",["$scope","BooksBook","Messages","GetMessages",function($scope,BooksBook,Messages,GetMessages) {
  console.log("");
  $scope.book = BooksBook.book.book;
  $scope.reviewTitle = "";
  $scope.book_id = "";
  $scope.review = "";
  


  $scope.createMessage = function() {
    var messages = GetMessages.get({book_id:$scope.book_id},function(message) {
      Messages.create($scope.reviewTitle,$scope.review,$scope.book_id,message);
      $scope.reviewTitle="";
      $scope.book_id = "";
      $scope.review = "";
    });
    
  };
}]);
