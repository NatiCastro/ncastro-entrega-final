//****Tienda****
$(()=>{
//Productos de la tienda
const productos = [
    { 
        id: "pigmentos",
        clase: "pigmentos",
        nombre: "PIGMENTOS PUROS",
        descripcion: "Pigmentos en polvo puros importados. Vienen en petaca transparente. Caja por 5 colores: rojo, verde, amarillo, azul y naranja.",
        precio: 1500,
        img: "/img/pigmentos.jpg",
        ranking: 1
  },
  
  {  
        id: "foil",
        clase: "foil",
        nombre: "PAPEL FOIL",
        descripcion: "Diseños veraniegos de frutas, marino, playa y flores. La plancha es tamaño A4. Incluye las 4 hojas y el pegafoil. Marca KIKI.",
        precio: 800,
        img: "/img/anana.jpg",
        ranking:2
  },
  {
        id: "muestrarios",
        clase: "muestrarios",
        nombre: "MUESTRARIOS",
        descripcion: "Muestrarios de acrílico, calidad premium, marca OPI. Vienen para pintar 200 uñas, con base y estructura de acrílico. Alta resistencia.",
        precio: 2500,
        img: "/img/muestrario.jpg",
        ranking: 3
  },
  {
        id: "oro",
        clase: "oro",
        nombre: "PAPEL ORO",
        descripcion: "Vienen en petaca, incluye esmalte especial para finalizar. Muy versátiles, para usar sobre esmaltes de colores o bases satinadas.",
        precio: 600,
        img: "/img/anteojos.jpg",
        ranking: 4
  },
  {
        id: "strass",
        clase: "strass",
        nombre: "STRASS",
        descripcion: "Apliques de strass brillantes marca KIKI, de distintos tamaños, formas y colores. Vienen en bolsita por 50 grs. Incluye un pegafoil.",
        precio: 1200,
        img: "/img/uñas-verdes.jpg",
        ranking: 5
},
{
        id: "topcoat",
        clase: "topcoat",
        nombre: "TOP COAT",
        descripcion: "Esmalte transparente para finalizar el trabajo, super resistente, marca OPI. Hacen durar el esmalte por más de 10 días. No apto para esmalte gel.",
        precio: 1300,
        img: "/img/uñas-rojas.jpg",
        ranking: 6
}
  ]

//Variables para el carrito de compras
let arrayItems = [];
let precioTotal = 0;
let cantTotal = 0;


//**********Función para agregar las cards de los productos y funcionamiento del carrito de compras************
  
function agregarCards(arrayOrdenado) {
    let container = document.querySelector("#contenedor-prod");
 
        for (const producto of arrayOrdenado) {
        let card = document.createElement("div");
        
        card.innerHTML = 
                        `<div class="col">
                        <div class="card card__img">
                        <img src="${producto.img}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text">$ ${producto.precio}</p>
                            <button type="button" id="${producto.id}" class="btn btn-dark comprar">Comprar</button>
                        </div>
                        </div>
                    </div>
        `;
    
        container.appendChild(card);
        
        };

    //Constructor para el carrito de compras
    class Carritocompras {
        constructor(nombre,precio,cantidad) {
            this.nombre = nombre;
            this.precio = precio;
            this.cantidad = cantidad;
        }
    }

    //Función que agrega items al carrito y remueve para actualizar la cantidad elegida
    function agregarItems () {
        $("#agregado").children().remove();

        for(item of arrayItems){
            $("#agregado").append(`<li>Agregaste ${item.nombre}. Precio: $ ${item.precio}. Cantidad: ${item.cantidad}</li>`);
            
        }
    };

        //Evento en el botón "comprar" y sumar productos al carrito de compras
        for (const producto of arrayOrdenado){

            $(`#${producto.id}`).on("click", function(){

                //Animación hasta el carrito de compras
                $('html, body').animate({
                    scrollTop: $("#carrito-compras").offset().top
                }, 2000);

                //Sumar las cantidades si eligió más del mismo item
                let i = arrayItems.findIndex(elemento => elemento.nombre == producto.nombre);
                if (i >= 0) {
                    arrayItems[i].cantidad++; 
                    agregarItems();

                } else {
                    arrayItems.push(new Carritocompras(`${producto.nombre}`,`${producto.precio}`,1));
                    agregarItems();
                };
                console.log(arrayItems);  

                //Agrego al html la cantidad de productos total
                $("#total").text(`Productos(${arrayItems.length})`);
                
                precioTotal = 0;
                cantTotal = 0;
                //Sumar el precio total y la cantidad total
                for(item of arrayItems){
                    precioTotal += (item.cantidad * item.precio);
                    cantTotal += item.cantidad;
                }
                //Los agrego al html
                $("#total").text(`Productos(${cantTotal})`);
                $("#precio-total").text(`Total: $ ${precioTotal}`)

            })  
            
        }

    //Función para vaciar el carrito
    $("#vaciarCarrito").on("click", function(){
        //Remuevo los items
        $("#agregado").children().remove();
        //Reseteo el array y las variables
            arrayItems=[];
            precioTotal = 0;
            cantTotal = 0;
            //Agrego al html 
            $("#total").text(`Productos(${cantTotal})`);
            $("#precio-total").text(`Total: $ ${precioTotal}`)
    }) 

}
 
 agregarCards(productos); 
    
//******Función para seleccionar como ordenar los productos****** 

function selectores () {

    let selector = document.querySelector(".selectores");
    let contenedor = document.createElement("div");
        
        contenedor.innerHTML = `<label>Ordenar por:</label>
                                    <select id="opciones">                   
                                    <option>Más vendidos</option>
                                    <option>Menor precio</option>
                                    <option>Mayor precio</option>
                                    <option>Orden alfabético</option>
                                </select>
                                `;
        
        selector.appendChild(contenedor);
             
        let id = document.querySelector("#opciones");

        //Función para elegir la opción del selector
        id.addEventListener("change",()=>{

            //Ordenar de menor a mayor precio
            if (`${id.value}` == "Menor precio") {
                let ordenar = productos.sort((a,b) => {
                    return a.precio - b.precio   
                    });
                    //Remuevo las cards originales
                    $("#contenedor-prod").children().remove();
                    //Llamo a la función para agregar las cards con el nuevo array ordenado
                    agregarCards(ordenar); 

            //Por orden alfabético       
            } else if (`${id.value}` == "Orden alfabético"){       
                let ordenar = productos.sort((a,b) => {
                    return a.nombre > b.nombre
                    });

                    $("#contenedor-prod").children().remove();

                    agregarCards(ordenar); 
            
            //Por ranking de "más vendidos"
            } else if (`${id.value}` == "Más vendidos"){
                let ordenar = productos.sort((a,b) => {
                    return a.ranking - b.ranking
                    });
                    
                    $("#contenedor-prod").children().remove();

                      agregarCards(ordenar); 

            //De mayor a menor precio     
            } else if (`${id.value}` == "Mayor precio"){
                                
                let ordenar = productos.sort((a,b) => {
                    return b.precio - a.precio
                    });
                    
                    $("#contenedor-prod").children().remove();

                    agregarCards(ordenar); 
          
            }
        
        })
}
        
selectores();



//*****Función para la búsqueda de productos*****

let formBuscar = document.querySelector("#buscar");
formBuscar.addEventListener("click", buscar);


function buscar(e) {
    e.preventDefault();

        let articulo = document.getElementById("input-buscar").value;
        //Función para buscar el producto por nombre
        let validar = productos.filter(element => element.nombre.includes(articulo.toUpperCase()));
        console.log(validar);

            if (validar.length == 0) {
                alert("No tenemos ese producto")
                document.querySelector("#form-buscar").reset(); 

            } else {
                $('html, body').animate({
                    scrollTop: $("#contenedor-prod").offset().top
                }, 2000);
                //Remuevo los productos
                $("#contenedor-prod").children().remove();
                //Llamo a la función para agregar sólo las cards de los productos encontrados
                agregarCards(validar); 
                
                document.querySelector("#form-buscar").reset();
            }   
}


//***********Array de objetos - cards medios de pago***************

const mediosDePago = [
  { 
    nombre: "Tarjetas Débito o Crédito",
    descripcion: "Visa, Mastercard, Naranja, American Espress",
    img: "/img/tarjetas.jpg"
},

{  
    nombre: "Efectivo",
    descripcion: "Pesos. Dólares.",
    img: "/img/efectivo.png"
},
{
    nombre: "Mercado Pago",
    descripcion: "Tranferencia, envío, código QR",
    img: "/img/mercadopago.png"
},
{
    nombre: "Cuenta DNI",
    descripcion: "Tranferencia, envío, código QR",
    img: "/img/cuentadni.png"
}
]

// Función para agregar las cards
function cardsPagos() {
   let container = document.querySelector("#contenedor_pagos");

   for (const pagos of mediosDePago) {
    let card = document.createElement("div");
    card.innerHTML = 
                    `<div class="col">
                        <div class="card text-center card__pagos">
                            <img src="${pagos.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h4 class="card-title">${pagos.nombre}</h4>
                                <p class="card-text">${pagos.descripcion}</p>
                            </div>
                        </div>
                    </div>
    `;

    container.appendChild(card);
   }

}

cardsPagos();



})