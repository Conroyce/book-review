app.controller("BookCtrl",["$scope","BooksBook","Messages","GetMessages","$http",function($scope,BooksBook,Messages,GetMessages,$http) {
  console.log("");
  $scope.book = BooksBook.book.book;
  $scope.reviewTitle = "";
  $scope.book_id = "";
  $scope.review = "";
  $scope.messages = $http.get("/books/"+$scope.book_id+"/messages");


  $scope.createMessage = function() {
    $http.get("/books/"+$scope.book_id+"/messages").success(function(message) {
        Messages.create($scope.reviewTitle,$scope.review,$scope.book_id,message);
        $scope.reviewTitle="";
        $scope.book_id = "";
        $scope.review = "";
    });
    
  };
}]);
