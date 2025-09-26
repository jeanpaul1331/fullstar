const http = require("http");
const fs = require("fs");
const path = require("path")
const eventos = require("events")

//Create  event emitter
const EventEmitter = new eventos();

//Registro de eventos
EventEmitter.on("fileRead",(filename)=>{
    console.log(`File "${filename}" fue leido con exito`)
});

//Server 
const server = http.createServer((req, res)=>{

    //Registro de Routas
    const filePath = path.join(__dirname, "messages.txt");

    if(req.url==="/"){
        res.writeHead(200, {"content-type":"text/plain"});
        res.end("Bienvenido Al Servidor De Archivos");
    }

    // Leer archivo
    else if(req.url === "/leer"){
            fs.readFile(filePath, "utf-8",(err,data)=>{
            //Error Leyendo Archivo
            if(err){
                //Mensaje de error por HTTP
                res.writeHead(500, {"content-type":"text/plain"});
                res.end("Error de lectura de archivo");
            };
            //Mensaje de exito por HTTP
            //Caso De Exito - Leemos Archivo
            EventEmitter.emit("fileRead","messages.txt")
            //Data por HTTP
            res.writeHead(200,{"content-type":"text/plain"});
            res.end(`Éxito de lectura de archivo\nContenido:\n${data}`);
        });
    }
    
    // Escribir archivo 
    else if (req.url === "/escribir") {
        fs.writeFile(filePath, "Hola, este es un nuevo archivo!", (err) => {
            //Error Escritura Archivo
            if (err) {
                //Mensaje de error por HTTP
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Error al escribir el archivo");
            }
            //Mensaje de exito por HTTP
            //Caso De Exito - Escribir por HTTP
            EventEmitter.emit("fileWrite", "messages.txt");
            //Data por HTTP
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Archivo escrito con éxito");
        });
    }
    // Actualizar archivo
    else if (req.url === "/actualizar") {
        fs.appendFile(filePath, "\nNueva línea agregada!", (err) => {
            //Error Modificar Archivo
            if (err) {
                //Mensaje de error por HTTP
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Error al actualizar el archivo");
            }
            //Mensaje de exito por HTTP
            //Caso De Exito - Modificar por HTTP
            EventEmitter.emit("fileUpdate", "messages.txt");
            //Data por HTTP
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Archivo actualizado con éxito");
        });
    }

    // Eliminar archivo
    else if (req.url === "/eliminar") {
        fs.unlink(filePath, (err) => {
            //Error Eliminar Archivo
            if (err) {
                //Mensaje de error por HTTP
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Error al eliminar (tal vez no existe)");
            }
            //Mensaje de exito por HTTP
            //Caso De Exito - Eliminar por HTTP
            EventEmitter.emit("fileDelete", "messages.txt");
            //Data por HTTP
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Archivo eliminado con éxito");
        });
    }

    // Ruta no encontrada
    else{
        //Mensaje de error por HTTP
        res.writeHead(404, {"content-type":"text/plain"});
        res.end("Page no found");
    }
});

server.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});