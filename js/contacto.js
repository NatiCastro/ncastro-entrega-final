//****Contacto****
$(()=>{

class Contacto {
    constructor (nombre,email,mensaje) {
        this.nombre = nombre;
        this.email = email;
        this.mensaje = mensaje
    }
}

//Función para saber si escribió en todos los campos

$("#nombre").on("change",function(){
    verificar()
})

$("#email").on("change",function(){
    verificar()
})

$("#text-area").on("change",function(){
    verificar()
})

const verificar = () => {

    if (($("#nombre").val().length > 0) && ($("#email").val().length > 0) && ($("#text-area").val().length > 0)) {
        
        $(".mostrar").css("display","none");
        
     }else {
        $(".mostrar").css("display","inline");

     }
}

//Función para enviar el formulario, agregar los datos al constructor y guardarlos en el storage
$("#form").on("submit", function(e){

 e.preventDefault();


    const datosContacto = () => {

        let nombre = $("#nombre").val();
        let email = $("#email").val();
        let mensaje = $("#text-area").val();
    
        let nuevoContacto = new Contacto(nombre,email,mensaje);
    
        sessionStorage.setItem("Datos", JSON.stringify(nuevoContacto));
        console.log(JSON.parse(sessionStorage.getItem("Datos")));


        return nuevoContacto;

    }  
//Agrego un mensaje en pantalla cuando el formulario es enviado
let guardarDatos = datosContacto();

$(".mensaje").append(`Gracias ${guardarDatos.nombre} por escribirnos! <br/> 
                    Te responderemos al mail ${guardarDatos.email} a la brevedad.`);
                    
$(".mensaje").css({
    "background-color":"pink",
    "margin-bottom":"2rem"
    });


console.log(guardarDatos);


e.submit;


})


})






