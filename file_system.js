const fs = require('fs');
const http = require('http');
const path = require('path');
const eventos = require('events');

// CONFIGURACIÓN DE EVENTOS

const emitter = new eventos.EventEmitter();

emitter.on('fileRead', (filename) => {
  console.log(`📖 File "${filename}" has been read successfully.`);
});

emitter.on('fileUpdate', (filename) => {
  console.log(`✏️ File "${filename}" has been updated.`);
});

emitter.on('fileDelete', (filename) => {
  console.log(`🗑️ File "${filename}" has been deleted.`);
});

// FUNCIÓN ASINCRÓNICA PARA REGISTRAR LOGS

async function logRequest(method, url) {
  const date = new Date().toISOString();
  const logEntry = `${date} - ${method} - ${url}\n`;
  const logPath = path.join(__dirname, 'log.txt');

  try {
    await fs.promises.appendFile(logPath, logEntry);
  } catch (err) {
    console.error('❌ Error writing to log file:', err);
  }
}

// CONFIGURACIÓN DE ARCHIVOS Y SERVIDOR

const filePath = path.join(__dirname, 'archivo.txt');

const server = http.createServer(async (req, res) => {
  // Registrar cada solicitud en el log
  await logRequest(req.method, req.url);

  // RUTAS /user (solo ejemplos)

  if (req.url === '/user' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'GET /user recibido' }));
  }

  if (req.url === '/user' && req.method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'POST /user recibido' }));
  }

  if (req.url === '/user' && req.method === 'PUT') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'PUT /user recibido' }));
  }

  if (req.url === '/user' && req.method === 'DELETE') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'DELETE /user recibido' }));
  }

  // 📂 RUTAS DEL SISTEMA DE ARCHIVOS

  // Raíz
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('🌐 Welcome to File Server Manager.');
  }

  // Leer archivo
  if (req.url === '/read' && req.method === 'GET') {
    return fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('❌ Error reading file.');
      }

      emitter.emit('fileRead', filePath);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  }

  // Actualizar archivo
  if (req.url === '/update' && req.method === 'PUT') {
    return fs.appendFile(filePath, '\nContenido adicional actualizado.', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('❌ Error updating file.');
      }

      emitter.emit('fileUpdate', filePath);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('✏️ File has been updated.');
    });
  }

  // Eliminar archivo
  if (req.url === '/delete' && req.method === 'DELETE') {
    return fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('❌ Error deleting file.');
      }

      emitter.emit('fileDelete', filePath);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('🗑️ File deleted successfully.');
    });
  }

  // Leer archivo de logs
  if (req.url === '/leer-log' && req.method === 'GET') {
    const logPath = path.join(__dirname, 'log.txt');
    try {
      const data = await fs.promises.readFile(logPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('❌ Error reading log file.');
    }
  }

  // RUTA NO ENCONTRADA

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('⚠️ Ruta no encontrada');
});

// INICIO DEL SERVIDOR

server.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});
