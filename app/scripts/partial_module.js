/**
 * Created by RandAlThor on 8/10/15.
 */
wineryApp.controller('WineryDetailController', function($scope, $http, $filter, $modalInstance, winery, serviceWinery){
  /*$scope.$on('sendWinery', function(winery){
   $scope.winery = winery;
   $('#winery-detail').modal();
   });*/
  serviceWinery.otherWinery = winery;


  console.log("detail controller");
  console.log(serviceWinery.otherWinery);

  $scope.errors = false;
  $scope.wineryS = winery;
  $scope.winerySBackUp = angular.copy(winery);

  $scope.$watch('wineryS', function(){
    $scope.watcher();
  }, true);

  $scope.ok = function () {

    $http.put('http://localhost:8888/BBApiRest/app/api/saveWineDetail.php', $filter('json')(winery))
      .success(function(response){
        $modalInstance.close();
      });
  };

  $scope.cancel = function () {

    angular.copy($scope.winerySBackUp, $scope.wineryS);

    $modalInstance.dismiss('cancel');
  };

  $scope.watcher = function(){
    $scope.errors = (!$scope.wineryS.name || !$scope.wineryS.grapes || !$scope.wineryS.castle);

    console.log($scope.errorss);
  }
});
