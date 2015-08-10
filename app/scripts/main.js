var wineryApp = angular.module('WineryApp', ['ui.bootstrap']);

wineryApp.controller('WineryListController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {
  $scope.name = 'Hugo SOSA';

  $http.get('http://localhost:8888/BBApiRest/app/api/wines.php')
    .success(function(response){
       $scope.listOfWineries = response;
    });

  $scope.selectedWinery = null
  $scope.animationsEnabled = true;
  $scope.sendWinery = function(id){

    $scope.listOfWineries.forEach(function(item){
      if (item.id == id)
      {
        //$scope.$broadcast('sendWinery', {winery: item});
        $scope.selectedWinery = item;

        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'templates/wineryDetail.html',
          controller: 'WineryDetailController',
          size: 'lg',
           resolve: {
            winery: function () {
              return $scope.selectedWinery;
            }
          }
        });

        modalInstance.result.then(function () {

        }, function() { });

        }
    });
  }
}]);

wineryApp.controller('WineryDetailController', function($scope, $modalInstance, winery){
  /*$scope.$on('sendWinery', function(winery){
    $scope.winery = winery;
    $('#winery-detail').modal();
  });*/

  $scope.winery = winery;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});



wineryApp.directive('wineryListForm', function(){
    return {
          restrinct: 'E',
          templateUrl: "/templates/wineryList.html"
    };
});

wineryApp.directive('wineryDetail', function(){
  return {
    /*restrinct: 'E',
    templateUrl: "/templates/wineryDetail.html"*/
  };
});

wineryApp.controller('JasmineTest', function($scope){

  $scope.returnMessage = function(){
    return "Bonjour le Québec";
  };
});


describe('JasmineTest', function(){
  beforeEach(module('WineryApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  it('returns Bonjour le Québec', function(){
      var $scope = {};
      var controller = $controller('JasmineTest', {$scope: $scope});

      expect($scope.returnMessage()).toEqual("Bonjour le Québec");
  });
});



