const fs = require("fs")
const { measureMemory } = require("vm")

//CRUD


// CREATE


//write
/*fs.writeFile ("inicianado archivo en node, hola mundo!!",(err)=>{
    //si hay error
    if(err) throw err;
    //mensaje exito
    console.log("archivo creado con exito!!");
});
*/

//READ
// fs.readFile ("messages.txt","utf-8",(err, data)=>{
//    //si hay error 
//     if(err) throw err;

//     // mensaje exito
//     console.log("los meNsajes del archivo son: /h",data);

// });

//UPDATA
/fs.appendFile("messages.txt","\h nueva linea de archivo...",(err, data)=>{
   //si hay error 
    if(err) throw err;

    // mensaje
    console.log("archivo actualizado!!");

});

//DELETE
// fs.unlink("messages.txt",(err, data)=>{
//    //si hay error 
//     if(err) throw err;

//     // mensaje exito
//     console.log("El archivo fue eliminado!!");

// });
