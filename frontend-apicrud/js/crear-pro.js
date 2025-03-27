// Paso 5.1: Crear variables globales
const d = document;
let nameImput = d.querySelector("#productos-select");
let priceImput = d.querySelector("#precio-pro");
let stockImput = d.querySelector("#stock-pro");
let descripcionImput = d.querySelector("#des-pro");
let imagenInput = d.querySelector("#imagen-pro");
let btnCreate = d.querySelector(".btn-create");
let productUpdate;

//*********************************************************
let nameUser = d.querySelector("#nombre-usaurio");
let btnLogout = d.querySelector("#btnLogout");

let getUser = () =>{
    let user = JSON.parse(localStorage.getItem("userLogin")); //la clave del LocalStrorge
    nameUser.textContent = user.nombre;
};

//Paso 7.4: Evento para el boton del LogOut
btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("userLogin");
    location.href ="../login.html"
});
//*********************************************************


//Paso 5.2: Evento al boton del formulario
btnCreate.addEventListener('click', async ()=>{
    //alert("producto: " + nameImput.value);
    let dataProduct = getDataProduct();
    sendDataProduct(dataProduct);
});

//Paso 6.3: evento al navegador para comprobar si recarrgo la pagina
d.addEventListener("DOMContentLoaded", ()=>{
    getUser();
    productUpdate = JSON.parse(localStorage.getItem("productEdit"));
    if (productUpdate != null) {
        updateDataProduct();
    }
});

//Paso 5.3: Crear funcion para validar el formulario y obtener los datos del formulario
let getDataProduct = ()=>{
    //validar formulario
    let product;
    if (nameImput.value && priceImput.value && stockImput.value && descripcionImput.value && imagenInput.src) {
        product ={
            nombre: nameImput.value,
            descripcion: descripcionImput.value,
            precio: priceImput.value,
            stock: stockImput.value,
            imagen: imagenInput.src
        };
        //Paso 5.4: Limpiar el formulario
        priceImput.value ="";
        descripcionImput.value ="";
        stockImput.value ="";
        imagenInput.src ="https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
        console.log(product);   
    }else{
        alert("Todos los campos son obligatorios")
    }
    return product;
};

//Paso 5.5: Funcion recibir los datos
let sendDataProduct =  async(data)=>{
    //Necesitamos un EndPoint
    let url ="http://localhost/backend-apiCrud/productos"
    try {
        //Promesa
        let respuesta = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON. stringify(data)
        });
        if (respuesta.status === 406) {
            alert("Los datos enviados no son admitidos")
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);  
        }
        
    } catch (error) {
        console.log(error);       
    }    
};

//Paso 6.5: funcionar para editar el producto
let updateDataProduct = ()=>{
    // Agregar datos que vamos a editar en el formulario
    let product;
    nameImput.value = productUpdate.nombre;
    priceImput.value = productUpdate.precio;
    stockImput.value = productUpdate.stock;
    descripcionImput.value = productUpdate.descripcion;
    imagenInput.src = productUpdate.imagen;

    //alternar boton crear y editor
    let btnEdit = d.querySelector(".btn-update");
    btnCreate.classList.toggle("d-none");
    btnEdit.classList.toggle("d-none");

    //agregar evento al boton editar
    btnEdit.addEventListener("click", ()=>{
        product ={
            id: productUpdate.id,
            nombre: nameImput.value,
            descripcion: descripcionImput.value,
            precio: priceImput.value,
            stock: stockImput.value,
            imagen: imagenInput.src
        };
        //Borrar la info del LocalStorage
        localStorage.removeItem("productEdit");
        //Pasar los datos dle producto a la funcion
        sendUpdateProduct(product);
    });
};

//Paso 6.6: Funcionar para realizar la peticion al servidor
let sendUpdateProduct = async (pro)=>{
    let url ="http://localhost/backend-apiCrud/productos"
    try {
        //Promesa
        let respuesta = await fetch(url,{
            method: "PUT", //porque vamos a Actualizar es PUT
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON. stringify(pro)
        });
        if (respuesta.status === 406) {
            alert("Los datos enviados no son admitidos")
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message);
            location.href = "../listado-pro.html";
        }     
    } catch (error) {
        console.log(error);       
    }
}