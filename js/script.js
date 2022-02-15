//****Home****
$(()=>{

//Animaciones concatenadas en las cards
$(".box").fadeOut(3000)
         .delay(1000)
         .fadeIn(3000, function(){
             
    console.log("Terminó la animación")
                      })

//Llamanda ajax - botón de "ver comentarios"
const url = "https://jsonplaceholder.typicode.com/comments";

$("#getComments").on("click", function(){
     $.getJSON(url, function(data,status){

          let datos = data;
          console.log(status);

          if (status == "success") {
               
               for (const dato of datos) {
                    $("#getData").append(
                         `
                         <h3><b>Nombre: ${dato.name}</b><h3/>
                         <h4>Mail: ${dato.email}<h4/>
                         <p>"${dato.body}"</p>
                         `
                    )
               }
          } else {
               alert ("La api no funciona actualmente");
          }
          
     })
})  
                   
})

