app.controller("BookCtrl",["$scope","BooksBook","Messages","GetMessages","$http","$resource",function($scope,BooksBook,Messages,GetMessages,$http,$resource) {
  console.log("");
  $scope.book = BooksBook.book.book;
  $scope.reviewTitle = "";
  $scope.review = "";
  $scope.messages = $http.get("/books/"+$scope.book.id+"/messages").success(function(data) { 
    console.log(data); 
  });
  // $scope.getMessage = GetMessages.query();

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
    // Getmessages.save($scope.reviewTitle,$scope.review,$scope.book_id);
    // Messages.create($scope.reviewTitle,$scope.review,$scope.book_id);
    $scope.reviewTitle="";
    $scope.review = "";
    
  };
}]);
