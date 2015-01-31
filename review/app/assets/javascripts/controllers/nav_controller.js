app.controller("NavCtrl",['$scope','$location',"$http",function($scope,$location,$http) {
  
  $scope.homePath = function() {
    $location.path("/");
  };
  $scope.current_user = $http.get("/log-in").success(function(data) { console.log(data); });
  $scope.currentUser = sessionStorage.name;
      

  console.log(sessionStorage.user)
}])