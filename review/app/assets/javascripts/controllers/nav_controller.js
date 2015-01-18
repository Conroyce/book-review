app.controller("NavCtrl",['$scope','$location',function($scope,$location) {
  
  $location.path("/");
  $scope.userPath = function() {
    $location.path("/users");
  };
  $scope.homePath = function() {
    $location.path("/");
  };
}])