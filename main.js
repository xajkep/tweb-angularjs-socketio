/**
 * TWEB - AngularJS et Socket.io en pratique
 *
 * @author  Benoît Zuckschwerdt
 * @date    2015-11-12
 *
 * @version 1.0
 *
 * Code serveur principal:
 *  + Gestion des routes
 *  + Gestion la réception des réponses envoyés par les clients
 *  + Gestion de l'envoie des données du sondage axu clients
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Tableau contenant les compteurs de réponses.
var poll = [0,0,0];

// Met le serveur en écoute sur le port spécifié.
server.listen(1337);

// Permet au code client d'utiliser les dossiers et fichiers
// contenu dans le dossier public.
app.use(express.static('public'));

// Envoie le fichier index.html lorsque l'on cherche
// a atteindre la racine /.
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Ecoute
io.on('connection', function (socket) {

  // Réceptionne les réponses, incrémente le compteur cible,
  // puis envoie les nouvelles données du sondage.
  socket.on('send', function (i) {
    poll[i]++;
    console.log(i + " " + poll[i]); //debug

    socket.emit('poll', poll);
  });

  // Envoie les données du sondage.
  // (demandé côté client lors de l'initialisation)
  socket.on('poll-request', function (data) {
    socket.emit('poll', poll);
  });
});
