async function getData(modificacion)
{
    // const response = await fetch('https://dog.ceo/api/breeds/image/random');
    //lanzo spinner
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    console.log(data);
    // ,
    //     {
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:modificacion
    //         // PersonasEmpleadosClientes.php, con el Verbo POST, con encabezado 
    //         // Content-Type de valor application/json y cuerpo un string de
    //         // objeto JSON que representa los atributos del elemento a modificar.
    //     }
    // );
   
}
    
    
    // .then(response=>{
    //     if(!response.ok)
    //     {
    //         throw new Error("Network response was not ok "+response.statusText);
    //     }
    //     else
    //     {
    //         response.json();
    //         // Actualizar tabla
    //         // Ocultar ABM
    //         // Ocultar spinner
    //     }
    // }).catch(error=>{
    //     // Lo mismo que arriba 
    //     // mas un alert de que no se pudo modificar
    //     console.error("Hubo un problema con la solicitud fetch:",error);
    // })
   
