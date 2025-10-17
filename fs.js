const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// Crear instancia de EventEmitter
const emitter = new EventEmitter();

// Archivo base de operaciones
const filePath = path.join(__dirname, 'archivo.txt');

// Archivo de logs
const logPath = path.join(__dirname, 'log.txt');

/*

// Delete - Eliminar un archivo
fs.unlink('archivo.txt', (err) => {
  if (err) throw err;
  console.log('El archivo ha sido eliminado');
});
*/

// Verificar si un archivo existe