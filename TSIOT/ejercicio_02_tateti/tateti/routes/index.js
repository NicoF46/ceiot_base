const { response } = require('express');
var express = require('express');
var router = express.Router();
const marcas = ['X', 'O'];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

function buscarGanador(){
  var iguales;
  var ganador;
  for (var indice = 0; indice < 3; indice++) {
    iguales = true;
    for (var celda = 0; celda < 3; celda++) {
      iguales = iguales && (tablero[celda][indice] == marcas[turno])
    }
    if (iguales) {
      ganador = turno;
      break;
    }
  }

  if (isNaN(ganador)) {
    for (var indice = 0; indice < 3; indice++) {
      iguales = true;
      for (var celda = 0; celda < 3; celda++) {
        iguales = iguales && (tablero[indice][celda] == marcas[turno])
      }
      if (iguales) {
        ganador = turno;
        break;
      }
    }
  }

  if (isNaN(ganador)) {
    iguales = true;
    for (var celda = 0; celda < 3; celda++) {
      iguales = iguales && (tablero[celda][celda] == marcas[turno])
    }
    if (iguales) {
      ganador = turno;
    }
  }

  if (isNaN(ganador)) {
    if  (tablero[0][2] == marcas[turno] && tablero[1][1] == marcas[turno] && tablero[2][0] == marcas[turno]){
      ganador = turno;
    }
  }
  return ganador;
};

router.put('/comenzar', function (req, res, next) {
  turno = 0;
  jugadores = req.body.jugadores;
  tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  res.setHeader('Content-Type', 'application/json');
  res.send({
    turno: jugadores[turno],
    tablero
  });
});

router.put('/movimiento', function (req, res, next) {
  const columna = req.body.columna;
  const fila = req.body.fila;
  if(tablero[fila][columna] != ''){
    res.status("422").send({ turno: jugadores[turno], tablero: tablero })
  }
  tablero[fila][columna] = marcas[turno]
  var ganador = buscarGanador();
  turno = (turno + 1) % 2;
  res.setHeader('Content-Type', 'application/json');
  if (isNaN(ganador)) {
    res.send({ turno: jugadores[turno], tablero: tablero })
  }
  else {
    res.send({
      ganador: jugadores[ganador], tablero: tablero
    });
  }
});

module.exports = router;
