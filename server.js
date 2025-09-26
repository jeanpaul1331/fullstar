const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

// Create event emitter
const myEmitter = new EventEmitter();

// Event listener for logging when a file is read
myEmitter.on("fileread", (filename) => {
    console.log(`File "${filename}" fue leído con éxito`);
});

// Event listener for logging when a file is written
myEmitter.on("filewrite", (filename) => {
    console.log(`File "${filename}" fue escrito con éxito`);
});

// Create an HTTP Server
const server = http.createServer((req, res) => {

    // Registro de rutas
    const filePath = path.join(__dirname, "messages.txt");

    if (req.url === "/") {
        // Página principal
        res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
        res.end("Bienvenido Al Servidor De Archivos");
    } 
    
    // Leer archivo
    else if (req.url === "/leer") {
        fs.readFile(filePath, "utf-8", (err, data) => {
            // Error leyendo archivo
            if (err) {
                // Mensaje de error por HTTP
                res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
                return res.end("Error de lectura de archivo");
            }
            // Mensaje de éxito por HTTP
            // Caso de éxito - Leemos archivo
            myEmitter.emit("fileread", "messages.txt");
            res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
            res.end(`Éxito de lectura de archivo:\n${data}`);
        }); 
    }

    // Escribir archivo 
    else if (req.url === "/escribir") {
        fs.writeFile(filePath, "Hola, este es un nuevo archivo!", (err) => {
            // Error Escritura Archivo
            if (err) {
                // Mensaje de error por HTTP
                res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
                return res.end("Error al escribir el archivo");
            }
            // Mensaje de éxito por HTTP
            // Caso de éxito - Escribir archivo
            myEmitter.emit("filewrite", "messages.txt");
            // Data por HTTP
            res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
            res.end("Archivo escrito con éxito");
        });
    }

    // Actualizar archivo
    else if (req.url === "/actualizar") {
        fs.appendFile(filePath, "\nNueva línea de archivo", (err) => {
            // Error actualizando archivo
            if (err) {
                // Mensaje de error por HTTP
                res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
                return res.end("Error actualizando archivo");
            }
            // Caso de éxito - Actualizamos archivo
            res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
            res.end("Archivo actualizado con éxito");
        });
    } 

    // Eliminar archivo    
    else if (req.url === "/eliminar") {
        fs.unlink(filePath, (err) => {
            // Error eliminando archivo
            if (err) {
                // Mensaje de error por HTTP
                res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
                return res.end("Error eliminando archivo");
            }
            // Caso de éxito - Eliminamos archivo
            res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
            res.end("Archivo eliminado con éxito");
        });
    } 
    
    else {
        // Página no encontrada
        res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        res.end("Página no encontrada");
    }
});

// Arrancar servidor
server.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});
