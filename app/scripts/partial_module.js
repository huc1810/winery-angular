/**
 * Created by RandAlThor on 8/10/15.
 */
wineryApp.controller('WineryDetailController', function($scope, $http, $filter, $modalInstance, winery, serviceWinery){

  serviceWinery.otherWinery = winery;

  $scope.errors = false;
  $scope.wineryS = winery;
  $scope.winerySBackUp = angular.copy(winery);

  $scope.$watch('wineryS', function(){
    $scope.watcher();
  }, true);

  $scope.ok = function(){

    if (!$scope.errors)
    {
      $http.put('http://localhost:8888/BBApiRest/app/api/saveWineDetail.php', $filter('json')(winery))
        .success(function(response){
          $modalInstance.close();
        });
    }
  };

  $scope.cancel = function(){

    angular.copy($scope.winerySBackUp, $scope.wineryS);

    $modalInstance.dismiss('cancel');
  };

  $scope.watcher = function(){
    $scope.errors = (!$scope.wineryS.name || !$scope.wineryS.grape || !$scope.wineryS.castle || !$scope.wineryS.type || !$scope.wineryS.year);
  }
});


wineryApp.controller('PaginationDemoCtrl', function ($scope, $log) {
  $scope.totalItems = 64;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});
