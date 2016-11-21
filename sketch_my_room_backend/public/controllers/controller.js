var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("sketch controller");


var refresh = function() {
  $http.get('/eventlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.eventlist = response;
    $scope.event = "";
  });
};

refresh();

$scope.addEvent = function() {
  console.log($scope.event);
  $http.post('/eventlist', $scope.event).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/eventlist/' + id).success(function(response) {
    refresh();
  });
};



}]);﻿