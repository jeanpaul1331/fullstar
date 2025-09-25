const fs = require("fs");
const http = require("http");
const path = require("path");
const eventos = require("events");

//Create event emitter
const EventEmitter = new eventos();


//Server
const server = http.createServer((req, res)=>{
    fs.readFile("messages.txt", "utf-8", (err, data)=>{
        if(err){
            //Mensaje de error por http
            res.writeHead(500, {"content-type": "text/plain"});
            res.end("error leyendo archivo!!")
        };
        //Data por http
        res.writeHead(200, {"content-type": "text/plain"});
        res.end(data);
    });
});
server.listen(3000, ()=>{
    console.log("server running at http://localhost:3000");
});