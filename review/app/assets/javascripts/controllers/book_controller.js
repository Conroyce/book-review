app.controller("BookCtrl",["$scope","BooksBook",function($scope,BooksBook) {
  console.log("");
  $scope.book = BooksBook.book.book;
}]);
