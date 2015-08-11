var wineryApp = angular.module('WineryApp', ['ui.bootstrap']);

wineryApp.service('serviceWinery', function(){
  this.Otherwinery = {};
});

wineryApp.controller('WineryListController', ['$scope', '$http', '$modal', 'serviceWinery', function($scope, $http, $modal, serviceWinery) {
  $scope.name = 'Hugo SOSA';

  $http.get('http://localhost:8888/BBApiRest/app/api/wines.php')
    .success(function(response){
       $scope.listOfWineries = response ;

    });

  $scope.selectedWinery = null
  $scope.animationsEnabled = true;
  $scope.sendWinery = function(id){

  angular.forEach($scope.listOfWineries, function(item, key){

      if (item.id == id)
      {
        //$scope.$broadcast('sendWinery', {winery: item});
        $scope.selectedWinery = item;

        serviceWinery.otherWinery = $scope.selectedWinery;

        console.log("main controller");
        console.log(serviceWinery.otherWinery);

        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'templates/wineryDetail.html',
          controller: 'WineryDetailController',
          size: '',
          resolve: {
            winery: function () {
              return $scope.selectedWinery;
            }
          }
        });

        modalInstance.result.then(function () { },
          function() { });
      }
  });
  }
}]);


wineryApp.directive('wineryListForm', function(){
    return {
          restrinct: 'E',
          templateUrl: "/templates/wineryList.html"
    };
});









/*Testing code*/

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
      $controller('JasmineTest', {$scope: $scope});

      expect($scope.returnMessage()).toEqual("Bonjour le Québec");
  });
});

var f = function(x){ return x + 5; }

describe('returns 7', function(){
  it('returns addition', function(){
    expect(f(2)).toBe(7);
  });
});

function Person(){
  var fn = function(){
    return "Hello, I'm a class";
  }

  return function(){
    fn();
  };
}
