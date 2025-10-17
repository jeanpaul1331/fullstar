// Importar módulos necesarios
const http = require('http');
const { stringify } = require('querystring');

// Crear el servidor
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hola mundo desde el servidor con Node.js\n');
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
