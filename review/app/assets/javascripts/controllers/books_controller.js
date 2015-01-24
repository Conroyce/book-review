app.controller("BookListCtrl",["$http","$scope","BooksBook","$location",function($http,$scope,BooksBook,$location) {


  $scope.method = "GET";
  $scope.url = "https://www.googleapis.com/books/v1/volumes?q=Fiction&maxResults=18";
  $scope.book = {title:"hey"}; 
  $scope.code = null;
  $scope.reponse = null;

  $scope.getBook = function(id) {
    $scope.data.items.forEach(function(x) {
      if (x.id === id) {
        BooksBook.book.book = x;
        
      }
    });
    $location.path("/"+id);
  };

  $http({method: $scope.method, url: $scope.url}).
    success(function(data,status) {
      $scope.status = status;
      $scope.data = data;
      BooksBook.allBooks = data;
      console.log($scope.data);
    });

}])

