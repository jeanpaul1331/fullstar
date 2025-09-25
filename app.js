const http = require("http");
const math = require("./math");
const fs = require("fs");


const server = http.createServer((req,res) =>{
    res.writehead(200,{"content-type":"text/plain"}),
    res.end("hola mundo !!desde servidor con node.js")
});
server.listen(3000,() =>{
    console.log("server running at http://localhost:3000");
    console.log("este es el resultado de la multiplicacion", math.multiply(4,3));
});

