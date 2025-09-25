//definimos las funciones a exportar
function add(a,b){
    return a + b;

}
function multiply(a,b){
    return a*b;
}
//exportamos las funciones para usarlas en otro archivo
module.exports={add,multiply};