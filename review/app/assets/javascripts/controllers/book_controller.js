app.controller("BookCtrl",["$http","$scope",function($http,$scope) {

  $scope.method = "GET";
  $scope.url = "https://www.googleapis.com/books/v1/volumes?q=Fiction&maxResults=18";
  
$scope.book = "";  
$scope.code = null;
$scope.reponse = null;

$http({method: $scope.method, url: $scope.url}).
  success(function(data,status) {
    $scope.status = status;
    $scope.data = data;
    console.log($scope.data);
});

}])

$scope.getBook = function(num) {
  $scope.book = 
}