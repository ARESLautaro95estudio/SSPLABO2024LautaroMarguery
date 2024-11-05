class Vehiculo
{
    Modelo="";
    VelocidadMaxima=0;
    añoFabrica=0;
    Id="";
    constructor(a_Modelo,a_añoFabrica,a_VelocidadMaxima,a_id)
    {
        this.Modelo = a_Modelo;
        this.VelocidadMaxima = a_VelocidadMaxima;
        if(a_añoFabrica<1985)
        {
            a_añoFabrica=1985;
        }
        this.añoFabrica = a_añoFabrica;
        this.Id = a_id;
    }
    setid(id)
    {
        this.Id=id;
    }
}
class Aereo extends Vehiculo
{
    carga=0;
    Autonomia=0;
    constructor(a_modelo,a_añoFabrica,a_velocidadMaxima,a_id,carga,a_Autonomia)
    {
        super(a_modelo,a_añoFabrica,a_velocidadMaxima,a_id);
        if(carga<0)
        {
            carga=1;
        }
        this.carga=carga;
        if(a_Autonomia<0)
        {
            a_Autonomia=1;
        }
        this.Autonomia=a_Autonomia;
    }
}
class Terrestre extends Vehiculo
{
    asientos=0;
    cantPue=0;
    constructor (a_modelo,a_añoFabrica,a_velocidadMaxima,a_id,asientos,a_cantPue)
    {
        super(a_modelo,a_añoFabrica,a_velocidadMaxima,a_id);
        if(asientos<2)
        {
            asientos=2;
        }
        if(a_cantPue<2)
        {
            a_cantPue=2;
        }
        this.asientos =asientos;
        this.cantPue=a_cantPue;
    }
}
window.addEventListener("load",()=>
{
    carga();
    botonAlta();
    filtrarinfo();
});
function botonAlta()
{
    head = document.getElementById("cabezadeTabla");
    btn = document.createElement("button");
    btn.textContent="Alta";
    btn.addEventListener("click",()=>
    {
       ALTA();
    });
    head.appendChild(btn);
}
function ALTA()
{
    document.getElementById("tabla").style.display="none";
    document.getElementById("div-chechks").style.display="none";
    if(document.getElementById("empleado-id1").style.display=="none")
    {
        document.getElementById("empleado-id").style.display="inline-block";
        document.getElementById("empleado-id1").style.display="inline-block";
        document.getElementsByName("coe").forEach((rdb)=>{
            rdb.style.display="inline-block";
        });
    }
    rdb =document.querySelectorAll('input[name="coe"]'); 
    rdb.forEach(radioBtn =>{
        radioBtn.addEventListener('change', (event) =>{
            if(radioBtn.value=="Terrestre")
                {
                   usuario = "Terrestre";
                   document.getElementById("abm-lbl-autonomia").style.display="none";
                   document.getElementById("telefono-id").style.display="none";
                   document.getElementById("abm-lbl-altura").style.display="none";
                   document.getElementById("compras-id").style.display="none";

                   document.getElementById("abm-lbl-ruedas").style.display="flex";
                   document.getElementById("ventas-id").style.display="flex";
                   document.getElementById("abm-lbl-puertas").style.display="flex";
                   document.getElementById("sueldo-id").style.display="flex";
                }
                else
                {
                    usuario = "Aereo";
                    document.getElementById("abm-lbl-autonomia").style.display="flex";
                    document.getElementById("telefono-id").style.display="flex";
                    document.getElementById("abm-lbl-altura").style.display="flex";
                    document.getElementById("compras-id").style.display="flex";
                    document.getElementById("abm-lbl-ruedas").style.display="none";
                    document.getElementById("ventas-id").style.display="none";
                    document.getElementById("abm-lbl-puertas").style.display="none";
                    document.getElementById("sueldo-id").style.display="none";

                    document.getElementById("ventas-id").required=false;
                    document.getElementById("sueldo-id").required=false;

                }
        });
     });
    btnAceptar  = document.createElement("button");
    btnAceptar.textContent="Aceptar";
    btnAceptar.id="btn-ABM-aceptar";
    formulario =document.getElementById("form-ABM"); //ESte es el formulario que le tendria que enviar o le envio el usuario ya instanciado ?

    formulario.appendChild(btnAceptar);
    formulario.style.display="flex";
    document.getElementById("btn-ABM-aceptar").addEventListener("click",(e)=>
        {
        e.preventDefault();
        if(!formulario.checkValidity())
        {
            alert("Formulario incomplieto");
            return;
        }
        if(usuario=="Terrestre")
        {
            usuario= new Terrestre(
                formulario.Modelo.value,
                formulario.Velocidad_maxima.value,
                formulario.Año_de_fabrica.value,
                formulario.id.value,
                formulario.Cantidad_de_ruedas.value,
                formulario.Cantidad_de_puertas.value,
            );
        }
        else
        {
            usuario= new Aereo(
            formulario.Modelo.value,
            formulario.Año_de_fabrica.value,
            formulario.Velocidad_maxima.value,
            formulario.id.value,
            formulario.Altura_maxima.value,
            formulario.Autonomia.value,
            );
        }
        altaAsync(usuario,formulario)     
    });
}
function cargarAtabla(usuario)
{
    //creo tabla
    tr=document.createElement("tr");
    for(let atributo in usuario)
    {
        td = document.createElement("td");
        if (usuario instanceof Terrestre)
        {   
            td.textContent=usuario[atributo];
            if(atributo=="Id")
            {
                tr.appendChild(td);
                td1 = document.createElement("td");
                td1.textContent="-----";
                tr.appendChild(td1);
                td1 = document.createElement("td");
                td1.textContent="-----";
                tr.appendChild(td1);
            }
            else
            {
                tr.appendChild(td);
            }
        }
        if (usuario instanceof Aereo)
        {   
            td.textContent=usuario[atributo];
            if(atributo=="Autonomia")
            {
                tr.appendChild(td);
                td1 = document.createElement("td");
                td1.textContent="-----";
                tr.appendChild(td1);
                td1 = document.createElement("td");
                td1.textContent="-----";
                tr.appendChild(td1);
            }
            else
            {
                tr.appendChild(td);
            }
        }   
    }
    tr=botonesDeTabla(tr,usuario.Id);
    body = document.getElementById("cuerpoDeTabla");
    body.appendChild(tr);
}
function botonesDeTabla(tr,id)
{
    td=document.createElement("td");
    btnEliminar = document.createElement("button");
    btnEliminar.textContent="Borrar";
    btnEliminar.id="boton-eliminar";
    btnEliminar.addEventListener("click",()=>
    {
        bajaFetch(btnEliminar.id,tr);
    })
    td.appendChild(btnEliminar);
    tr.appendChild(td);
    td=document.createElement("td");
    btnModificar = document.createElement("button");
    btnModificar.textContent="Modificar";
    btnModificar.id="boton-modificar";
    btnModificar.addEventListener("click",()=>
    {
        btnModificar.id=id;
        document.getElementById("tabla").style.display="none";
        document.getElementById("div-chechks").style.display="none";
        Modificar(tr);
    })
    td.appendChild(btnModificar);
    tr.appendChild(td);
    return tr;
}
function Modificar(tr)
{
    form =document.getElementById("form-ABM"); 
    form.style.display="flex";
    document.getElementById("empleado-id").style.display="none";
    document.getElementById("empleado-id1").style.display="none";

    document.getElementsByName("coe").forEach((rdb)=>{
        rdb.style.display="none";
    });
    bandera=false;
    if(tr.children[5].textContent!="-----")
    {
        bandera=true;
    }
    form.Modelo.value=tr.children[0].textContent;
    form.Año_de_fabrica.value=tr.children[1].textContent;
    form.Velocidad_maxima.value=tr.children[2].textContent;
    form.id.value=tr.children[3].textContent;
    form.Altura_maxima.value=tr.children[4].textContent;
    form.Autonomia.value=tr.children[5].textContent;
    form.Cantidad_de_ruedas.value=tr.children[6].textContent;
    form.Cantidad_de_puertas.value=tr.children[7].textContent;
    btnAceptar  = document.createElement("button");
    btnAceptar.textContent="Aceptar";
    btnAceptar.id="btn-ABM-aceptar";
    form.appendChild(btnAceptar);
    document.getElementById("btn-ABM-aceptar").addEventListener("click",(e)=>
    {
        e.preventDefault();
        //ACa deberia enviar el formulario y esperar el ok y cuando lo recibo ahi publico la tabla
            modificarFetch(tr,form,bandera,btnAceptar);
            
    });
}
function filtrarinfo()
{
    grupoChebocks = document.querySelectorAll('input[name="filtros"]');
    grupoChebocks.forEach((box)=>{
        box.addEventListener("change", ()=>{
            auxiliar(box);
        });
    });
}
function auxiliar(box)
{
    thead=document.getElementById("thead");
    tbody=document.getElementById("cuerpoDeTabla");
    console.log(box.value);
    switch(box.value)
    {
        case "Modelo":
            if(box.checked)
            {
                thead.children[0].children[0].style.display="none";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[0].style.display="none";
                })
            }
            else
            { thead.children[0].children[0].style.display="table-cell";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[0].style.display="table-cell";
                })}
            break;
        case "autonomia":
            if(box.checked)
            {thead.children[0].children[4].style.display="none";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[4].style.display="none";
                })}
            else
            {thead.children[0].children[4].style.display="table-cell";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[4].style.display="table-cell";
                })}
            break;
        case "Año":
            if(box.checked)
                {thead.children[0].children[2].style.display="none";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[2].style.display="none";
                    })}
                else
                {thead.children[0].children[2].style.display="table-cell";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[2].style.display="table-cell";
                    })}
            break;
        case "velocidad":
            if(box.checked)
                {thead.children[0].children[1].style.display="none";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[1].style.display="none";
                    })}
                else
                {thead.children[0].children[1].style.display="table-cell";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[1].style.display="table-cell";
                    })}
            break;
        case "carga":
            if(box.checked)
                { thead.children[0].children[5].style.display="none";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[5].style.display="none";
                    })}
                else
                {thead.children[0].children[5].style.display="table-cell";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[5].style.display="table-cell";
                    })}
            break;
        case "ruedas":
            if(box.checked)
                { thead.children[0].children[7].style.display="none";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[7].style.display="none";
                    })}
                else
                {thead.children[0].children[7].style.display="table-cell";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[7].style.display="table-cell";
                    })}
            break;
        case "puertas": 
        if(box.checked)
            {thead.children[0].children[6].style.display="none";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[6].style.display="none";
                })}
            else
            {thead.children[0].children[6].style.display="table-cell";
                Array.from(tbody.children).forEach((tr)=>{
                    tr.children[6].style.display="table-cell";
                })}
            break;
        case "id":
            if(box.checked){ 
                thead.children[0].children[3].style.display="none";
            Array.from(tbody.children).forEach((tr)=>{
                tr.children[3].style.display="none";
            })}
                else
                {thead.children[0].children[3].style.display="table-cell";
                    Array.from(tbody.children).forEach((tr)=>{
                        tr.children[3].style.display="table-cell";
                    })}
            break;
    }
}
function carga()
{
    inyectarSpinner();
    try
    {
        var xhttp = new XMLHttpRequest(); 
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) 
            {
                let jsonRespuesta = JSON.parse(xhttp.response);
                arrayInstanciado=cargaAux(jsonRespuesta);
                arrayInstanciado.forEach(item => cargarAtabla(item));
                removerSpinner();
            }
            else if(xhttp.status == 404)
            {
                console.log("404 not found");
            }
            else
            {
            }
        };
    }
    catch{
        
    }
    xhttp.open("GET",'https://examenesutn.vercel.app/api/VehiculoAutoCamion');
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}
function cargaAux(jsonRespuesta)
{
    array =jsonRespuesta.map( vehiculos => 
        {
        if (vehiculos.autonomia ===undefined)
        {
            return new Terrestre(vehiculos.modelo,vehiculos.
                anoFabricacion
                ,vehiculos.velMax,vehiculos.id,vehiculos.asientos,vehiculos.cantidadPuertas);
        }
        else
        {
            return new Aereo(vehiculos.modelo,vehiculos.anoFabricacion,vehiculos.velMax,vehiculos.id,vehiculos.autonomia,vehiculos.carga);
        }
    }
    );
    return array;
}
function inyectarSpinner() 
{

    const spinner = document.createElement("img");
    const contenedor = document.getElementById("spi");
    spinner.setAttribute("src", "../loadpng.webp");
    spinner.setAttribute("alt", "imagen spinner");
    spinner.setAttribute("height", "100px");
    spinner.setAttribute("width", "100px");
    spinner.setAttribute("id", "img1");
    spinner.style.position = "absolute";
    spinner.style.zIndex = 1000;
    contenedor.appendChild(spinner);
}
function removerSpinner() 
{
    const img = document.getElementById("img1");
    if (img) {
        img.remove();
    }
}
function modificarFetch(tr,form,bandera,btnAceptar)
{
    inyectarSpinner();
    try
    {
        fetch("https://examenesutn.vercel.app/api/VehiculoAutoCamion", {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                modelo: form.Modelo.value,
                anoFabricacion: form.Año_de_fabrica.value,
                velMax: form.Velocidad_maxima.value,
                id : form.id.value,
                asientos: form.Cantidad_de_puertas.value,
                cantidadPuertas: form.Cantidad_de_ruedas.value
    
            }) 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error: " + response.statusText);
                    removerSpinner();
                }
                console.log(472);
                auxiliarModifica(tr,bandera);
                return response.json(); 
            })
            .then(data => console.log("Respuesta del servidor:", data)) 
            .catch(error => {
                console.error("Hubo un problema con la solicitud fetch:", error);
                form.style.display="none";
                form.removeChild(btnAceptar);
                document.getElementById("form-ABM").reset();
                document.getElementById("tabla").style.display="table";
                document.getElementById("div-chechks").style.display="flex";
                removerSpinner();
            });
    }
    catch{}
    
}
function auxiliarModifica(tr,bandera,btnAceptar)
{
    tr.children[0].textContent=form.Modelo.value;
            tr.children[1].textContent=form.Año_de_fabrica.value;
            tr.children[2].textContent=form.Velocidad_maxima.value;
            
            if(bandera)
            {
                tr.children[4].textContent=form.Altura_maxima.value;
                tr.children[5].textContent=form.Autonomia.value;
            }
            else
            {
                tr.children[6].textContent=form.Cantidad_de_ruedas.value;
                tr.children[7].textContent=form.Cantidad_de_puertas.value;
            }
            form.style.display="none";
            document.getElementById("cuerpoDeTabla").appendChild(tr);
            document.getElementById("form-ABM").reset();
            document.getElementById("tabla").style.display="table";
            document.getElementById("div-chechks").style.display="flex";
            form.removeChild(btnAceptar);
}
async function altaAsync(usuario,formulario) 
{
    if(usuario instanceof Terrestre)
    {
        json={
            "modelo":usuario.Modelo,
            "anoFabricacion":usuario.añoFabrica,
            "velMax":usuario.VelocidadMaxima,
            "asientos":usuario.asientos,
            "cantidadPuertas": usuario.cantPue
        };
    }
    else
    {
        json={
            "modelo":usuario.Modelo,
            "anoFabricacion":usuario.añoFabrica,
            "velMax":usuario.VelocidadMaxima,
            "carga":usuario.carga,
            "autonomia": usuario.Autonomia
        };
    }
    try {
        inyectarSpinner(); 
        const response = await  fetch("https://examenesutn.vercel.app/api/VehiculoAutoCamion", {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(json) 
        })
        .then(response => response.json())
        .then(data=>{
                    usuario.setid(data.id);
                    cargarAtabla(usuario)
                    formulario.style.display="none";
                    document.getElementById("form-ABM").reset();
                    document.getElementById("tabla").style.display="table";
                    document.getElementById("div-chechks").style.display="flex";
                    formulario.removeChild(btnAceptar);
        })
        .catch();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        removerSpinner(); 
    } finally {
        removerSpinner(); 
    }
}

function bajaFetch(id,tr)
{
    fetch("https://examenesutn.vercel.app/api/VehiculoAutoCamion", {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "id":id
        }) 
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error: " + response.statusText);
            }
            // auxiliarModifica(tr,bandera);
            document.getElementById("cuerpoDeTabla").removeChild(tr)
            return response.json(); 
        })
        .then({
           
        }) 
        .catch();
}