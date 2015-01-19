app.controller("NavCtrl",['$scope','$location',function($scope,$location) {
  
  $scope.homePath = function() {
    $location.path("/");
  };

  $scope.currentUser = sessionStorage.name;
      

  console.log(sessionStorage.user)
}])