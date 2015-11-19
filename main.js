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
var PORT = process.env.PORT || 1337;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Tableau contenant les réponses.
var poll = [
  {
    "name": "yes",
    "count": 0
  },
  {
    "name": "no",
    "count": 0
  },
  {
    "name": "maybe",
    "count": 0
  },
]


// Met le serveur en écoute sur le port spécifié.
server.listen(PORT);
console.log("listen on 127.0.0.1:"+PORT);

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
    poll[i].count++;
    console.log(poll[i].name + " " + poll[i].count); //debug

    io.emit('poll', poll);
  });

  // Envoie les données du sondage.
  // (demandé côté client lors de l'initialisation)
  socket.on('poll-request', function (data) {
    socket.emit('poll', poll);
  });
});
