// Paso 1: Variables Globales del Formulario
const d = document;
userInput = d.querySelector("#usuarioForm"); //Colocamos numeral porque es un ID
passInput = d.querySelector("#contraForm");
btnLogin = d.querySelector(".btnLogin");

// Paso 1.1: Evento al boton del formulario
btnLogin.addEventListener("click",() => {
    let dataForm = getData();
    sendData(dataForm);
});

// Paso 1.2: Funcion para validar el formulario y obtener datos del mismo
let getData = ()=>{
    //validar formulario
    let user;
    if (userInput.value && passInput.value) {
        user ={
            usuario: userInput.value,
            contrasena: passInput.value
        };
        userInput.value ="";
        passInput.value ="";
    }else{
        alert("El usuario y la contraseña es obligatorio")
    }
    console.log(user);
    return user;
}

//Paso 1.3: Funcion para recibir los datos y realizar la peticion al servidor
let sendData =  async(data)=>{
    //Necesitamos un EndPoint
    let url ="http://localhost/backend-apiCrud/login"
    try {
        //Promesa
        let respuesta = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON. stringify(data)
        });
        if (respuesta.status == 401) {
            alert("El usuario y/o la contraseña es incorrecto")
        }else{
            let userLogin = await respuesta.json();
            //console.log(userLogin);
            alert(`Bienvenido: ${userLogin.nombre}`);
            //guardar datos en LocalStorage
            localStorage.setItem("userLogin", JSON.stringify(userLogin))
            //Redirigirlo al otro navegador
            location.href = "../index.html"
        }
        
    } catch (error) {
        console.log(error);       
    }    
}