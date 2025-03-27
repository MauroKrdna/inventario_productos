//(Video 3) Paso 1: variables gloables
let d = document;
let nameUser = d.querySelector("#nombre-usaurio");
let btnLogout = d.querySelector("#btnLogout");

//Paso 1.1: Funcion para poner el nombre
d.addEventListener("DOMContentLoaded", ()=>{
    getUser();
})

let getUser = () =>{
    let user = JSON.parse(localStorage.getItem("userLogin")); //la clave del LocalStrorge
    nameUser.textContent = user.nombre;
};

//Paso 2: Evento para el boton del LogOut
btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("userLogin");
    location.href ="../login.html"
});