app.controller("BookCtrl",["$scope","BooksBook","Messages","GetMessages","$http","$resource",function($scope,BooksBook,Messages,GetMessages,$http,$resource) {
  console.log("");
  $scope.book = BooksBook.book.book;
  $scope.reviewTitle = "";
  $scope.review = "";
  $scope.messages = $http.get("/books/"+$scope.book.id+"/messages").success(function(data) { 
    console.log(data); 
  });

  $scope.createMessage = function() {
    var obj = {
      method: 'POST',
      url: '/books/'+$scope.book.id+"/messages",
      data: {
          title: $scope.reviewTitle,
          review: $scope.review,
          book_id: $scope.book.id
      }
    }    
       
    $http(obj).success(function(data) {console.log(data);});
    $scope.reviewTitle="";
    $scope.review = "";
    
  };
}]);
