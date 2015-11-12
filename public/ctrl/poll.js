/**
 * TWEB - AngularJS et Socket.io en pratique
 *
 * @author  Benoît Zuckschwerdt
 * @date    2015-11-12
 *
 * @version 1.0
 *
 * Controlleur du sondage graphique:
 *  + Initialisation des labels du graphique
 *  + Met à jours le graphique
 */
var pollApp = angular.module('pollApp', ['chart.js']);

pollApp.controller('pollCtrl', function($scope) {

  $scope.chartLabels = ["yes", "no", "maybe"]

  var socket = io.connect('http://localhost:1337');

  // Receptionne les données du sondage
  // et met a jour le graphique.
  socket.on('poll', function (data) {
    console.log(data); //debug

    $scope.$apply(function () {
      $scope.chartData = data;
    });
  });
});
