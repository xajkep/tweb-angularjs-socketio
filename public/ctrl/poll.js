var pollApp = angular.module('pollApp', ['chart.js']);
pollApp.controller('pollCtrl', function($scope) {

  //$scope.bonjour = "BONJOUR";

  $scope.chartLabels = ["yes", "no", "maybe"]
  //$scope.chartData = [1,2,3];

  //var myBarChart = new Chart(ctx).Bar($scope.chartData, {});

  var socket = io.connect('http://localhost:1337');
  socket.on('poll', function (data) {
    console.log(data);

    $scope.$apply(function () {
      $scope.chartData = data;
    });
  });
});
