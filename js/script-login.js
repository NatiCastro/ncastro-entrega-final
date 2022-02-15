//****Login****   
$(()=>{
    
class Cliente {
    constructor(email,contrasenia) {
       
        this.email = email;
        this.contrasenia = contrasenia;
    }
}
//Simlulo un json con datos para loguearse
const clientes = [
    {
        email: "mariaperez@gmail.com",
        contrasenia: "1234",
    },
    {
        email: "jimenalopez@gmail.com",
        contrasenia: "jime123",
    },
    {
        email: "barbi_velez@gmail.com",
        contrasenia: "esmaltes",
    }
]


let formulario = document.getElementById("login");

formulario.addEventListener("submit", enviarFormulario);

//Función para recoger los datos del form, subirlos al objeto constructor y guardarlos en el stogarage
const guardarCliente = ()=>{

    let email = document.getElementById("mail").value;
    let contrasenia = document.getElementById("password").value;


    let nuevoCliente = new Cliente(email,contrasenia);
    sessionStorage.setItem("clientes",JSON.stringify(nuevoCliente));

    return nuevoCliente;
}

//Función para loguearse - saber si está registrado y si coinciden los datos
function enviarFormulario(e) {
    e.preventDefault();

    let login = guardarCliente();
   
    console.log("Formulario enviado");

    let buscarCliente = clientes.find(elemento => (elemento.email == login.email) && (elemento.contrasenia == login.contrasenia));
    
        
        if (buscarCliente == undefined) {

            alert("mail o contraseña invalidos");
            document.getElementById("login").reset();
            
        } else {
            $("#saludo").append(`Bienvenida ${login.email}`)
                        .css({'color':"#fff",
                             'font-size': "1.3rem",
                             'margin-right': "2rem" });
            document.getElementById("login").reset();

        }
    
    e.submit;

}

// Formulario para crear un nuevo usuario

//Botón "Registrate aquí"
$("#btn-registro").click(() => {
    $("#nuevo-usuario").toggle("slow");

})

//Constructor para un nuevo registro
class Registro {
    constructor (nombre,email,newpassword) {
        this.nombre = nombre;
        this.email = email;
        this.newpassword = newpassword
    }
}
//Botón enviar - subo los datos al constructor
$("#btn-submit").on("click", function(){

        let nombre = $("#nuevo-nombre").val();
        let email = $("#nuevo-mail").val();
        let newpassword = $("#nueva-password").val();
        
        let newRegistro = new Registro(nombre,email,newpassword)
        
        console.log(newRegistro);

        $("#registro-nuevo")[0].reset(); 
    
})
    
})







