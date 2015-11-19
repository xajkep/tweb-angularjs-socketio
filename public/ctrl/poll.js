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

var socket = io.connect();

pollApp.controller('pollCtrl', function($scope) {
  $scope.chartLabels = [];
  $scope.chartData = [];

  /**
   * Envoie une réponse
   * @param index de la réponse
   */
  $scope.send = function(s) {
    socket.emit('send', s);
  };

  // Receptionne les données du sondage
  // et met a jour le graphique.
  socket.on('poll', function (poll) {
    console.log(poll); //debug

    $scope.$apply(function() {
      $scope.chartLabels = [];
      $scope.chartData = [];
      setLabels($scope.chartLabels,poll);
      setData($scope.chartData, poll);
    });


  });
});

/**
 * Extrait le tableau des labels
 * @param el, poll
 */
function setLabels(el, poll) {

  for (var i = 0; i < Object.keys(poll).length; i++) {
    el.push(poll[i].name);
  }

}

/**
 * Extrait le tableau des compteurs
 * @param poll
 */
function setData(el, poll) {
  for (var i = 0; i < Object.keys(poll).length; i++) {
    el.push(poll[i].count);
  }

}

/**
 * Fonction d'initialisation
 */
function init() {
  socket.emit('poll-request');
}

/**
 * Fonction de reset
 */
function reset() {
  socket.emit('reset');
}
