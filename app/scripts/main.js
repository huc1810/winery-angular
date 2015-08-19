var wineryApp = angular.module('WineryApp', ['ui.bootstrap']);

wineryApp.service('serviceWinery', function(){
  this.Otherwinery = {};
});

wineryApp.factory('getWineriesList', function($http){

  var factory = {};

  factory.getWineries = function(){
     return $http.get('http://localhost:8888/BBApiRest/app/api/wines.php?page=1&records=10');
  }

  return factory;
});

wineryApp.controller('WineryListController', function($scope, $http, $log, serviceWinery, getWineriesList) {

  $scope.totalItems = 64;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {

    $scope.request = getWineriesList.getWineries();
  };

  $scope.pageChanged();

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});

wineryApp.directive('wineryListForm', function($modal){
    return {
          restrict: 'E',

          templateUrl: "/templates/wineryList.html",
        //  scope: { promise: '=wineryListForm' },
          link: function (scope, elem, attrs) {
            scope.promise.success(function (data) {

              scope.listOfWineries = data;

            });



            scope.selectedWinery = null;
            scope.animationsEnabled = true;
            scope.modalParameters = {
              animation: scope.animationsEnabled,
              templateUrl: 'templates/wineryDetail.html',
              controller: 'WineryDetailController',
              size: ''
            };

            scope.sendWinery = function(id){

              angular.forEach(scope.listOfWineries, function(item, key){

                if (item.id == id)
                {
                  scope.selectedWinery = item;
                  scope.modalParameters.resolve = {
                    winery: function () {
                      return scope.selectedWinery;
                    }
                  }

                  var modalInstance = $modal.open(scope.modalParameters);

                  modalInstance.result.then(function () { },
                    function() { });
                }
              });
            }
          }
    };
});

wineryApp.filter('truncateText', function(){

  return function(text){
    var truncated = text.slice(0, 15);

    if (text.length > 20)
    {
      truncated += '...';
    }

    return truncated;
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


var w = 10;

var f2 = (function(x){

  var y = 5;
  return {
    f: function(z){
      return (w + x + y + z);
    }
  };
});



describe('Returns the addition of different scopes', function(){
  it('sends the external variable', function(){
    expect(f2(5).f(4)).toEqual(24);
  });
});


function Animal(name, weight, age){
  this.name = name;
  this.weight = weight;
  this.age = age;
  this.ownerName = '';
}

Animal.prototype = {
  constructor: Animal,
  changeName: function(newName){
    this.name = newName;
  },
  setOwnerName: function(ownerName){
    this.ownerName = ownerName;
  }
};

var animal = new Animal("Max", 50, 7);

