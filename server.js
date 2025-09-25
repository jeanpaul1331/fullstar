const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

// Create event emitter
const myEmitter = new EventEmitter();

// Event listener for logging when a file is read
myEmitter.on("fileread", (filename) => {
    console.log(`File "${filename}" has been read successfully`);
});

// Create an HTTP Server
const server = http.createServer((req, res) => {

    // Registro de rutas
    const filePath = path.join(__dirname, "messages.txt");

    if (req.url === "/") {
        // Página principal
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Bienvenido Al Servidor De Archivos");
    } 
    
    else if (req.url === "/leer") {
        // Leer archivo
        fs.readFile(filePath, "utf-8", (err, data) => {
            // Error leyendo archivo
            if (err) {
                // Mensaje de error por HTTP
                res.writeHead(500, { "content-type": "text/plain" });
                return res.end("Error de lectura de archivo");
            }
            // Mensaje de éxito por HTTP
            // Caso de éxito - Leemos archivo
            myEmitter.emit("fileread", "messages.txt");
            res.writeHead(200, { "content-type": "text/plain" });
            res.end(`Éxito de lectura de archivo:\n${data}`);
        }); 
    } 
    
    else if (req.url === "/actualizar") {
        // Actualizar archivo
        fs.appendFile(filePath, "\nNueva linea de archivo", (err) => {
            // Error actualizando archivo
            if (err) {
                // Mensaje de error por HTTP
                res.writeHead(500, { "content-type": "text/plain" });
                return res.end("Error actualizando archivo");
            }
            // Caso de éxito - Actualizamos archivo
            res.writeHead(200, { "content-type": "text/plain" });
            res.end("Archivo actualizado con éxito");
        });
    } 
    
    else if (req.url === "/eliminar") {
        // Eliminar archivo
        fs.unlink(filePath, (err) => {
            // Error eliminando archivo
            if (err) {
                // Mensaje de error por HTTP
                res.writeHead(500, { "content-type": "text/plain" });
                return res.end("Error eliminando archivo");
            }
            // Caso de éxito - Eliminamos archivo
            res.writeHead(200, { "content-type": "text/plain" });
            res.end("Archivo eliminado con éxito");
        });
    } 
    
    else {
        // Página no encontrada
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Page not found");
    }
});

// Arrancar servidor
server.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});
