const NOMBRE_USUARIO_REGEX = /^[a-zA-Z0-9_-]{4,8}$/; 
const EMAIL_REGEX =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NUMERO_TELEFONO_REGEX = /^[\+]?[(+]?[\d\s\-\(\)]{8,}$/;
const CONTRASEÑA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
const CONFIRMAR_CONTRASEÑA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
const paises = document.querySelector('#countries');
const ponerNombre = document.querySelector('#username');
const ponerEmail = document.querySelector('#email');
const selectPais = document.querySelector('#countries');
const codigo = document.querySelector('#phone-code');
const telefono = document.querySelector('#phone');
const contra = document.querySelector('#password');
const confirContra = document.querySelector('#confirm-password');
const registrar = document.querySelector('.abilitar');
const registrar2 = document.querySelector('#form-btn');
const registrar3 = document.querySelector('#registrado');
const registrar4 = document.querySelector('.contenido2')

let usernameValidacion = false;
let emailValidacion = false;
let telfValidacion = false;
let passValidacion = false;
let passValidacion2 = false;
let paisesVali = false;

[ ... countries].forEach(opciones =>{
    opciones.innerHTML = opciones.innerHTML.split('(')[0];
});

const validaciones = (evento, validaciones, element) =>{
    const imformacion = evento.target.parentElement.children[1];
    const opcionesValidas = usernameValidacion && emailValidacion && telfValidacion && passValidacion && passValidacion2 && paisesVali;
    if(opcionesValidas){
        registrar.classList.remove('abilitar');
    }
    else{
        registrar.classList.add('abilitar');
    }

    if (validaciones){
        element.classList.add('repuestaCorrecta');
        element.classList.remove('repuestaErronea');
        imformacion.classList.remove('mostarinfo');
        
    }else{
        element.classList.add('repuestaErronea');
        element.classList.remove('repuestaCorrecta');
        imformacion.classList.add('mostarinfo')
    }
};

ponerNombre.addEventListener('input', evento =>{
  usernameValidacion = NOMBRE_USUARIO_REGEX.test(evento.target.value);
    validaciones(evento, usernameValidacion, ponerNombre);
});


ponerEmail.addEventListener('input', evento =>{
 emailValidacion = EMAIL_REGEX.test(evento.target.value);
  validaciones(evento, emailValidacion, ponerEmail);
});

selectPais.addEventListener('input', evento =>{
 const paiselect = [... evento.target.children].find(option => option.selected);
 paisesVali = true;
 codigo.innerHTML = `+${selectPais.value}`;
 selectPais.classList.add('repuestaCorrecta');
 codigo.classList.add('repuestaCorrecta');
});

telefono.addEventListener('input', evento =>{
 telfValidacion = NUMERO_TELEFONO_REGEX.test(evento.target.value);
  validaciones(evento, telfValidacion, telefono);
 const imformacion = evento.target.parentElement.parentElement.children[1];
  if (telfValidacion){
        telefono.classList.add('repuestaCorrecta');
        telefono.classList.remove('repuestaErronea');
        imformacion.classList.remove('mostarinfo')
    }else{
        telefono.classList.add('repuestaErronea');
        telefono.classList.remove('repuestaCorrecta');
        imformacion.classList.add('mostarinfo')
    }
});


contra.addEventListener('input', evento =>{
 passValidacion = CONTRASEÑA_REGEX.test(evento.target.value);
 validaciones(evento, passValidacion, contra);
});

confirContra.addEventListener('input', evento =>{
 passValidacion2 = contra.value == evento.target.value;
    validaciones(evento, passValidacion2, confirContra);
 
});


registrar2.addEventListener('click', evento =>{
    evento.preventDefault();
    registrar3.style.display = 'flex';
    const respuestas = {
        Username: ponerNombre.value,
        Email: ponerEmail.value,
        Phone: `${codigo.innerHTML} ${telefono.value}`,
    }
    registrar4.innerHTML= `
        <h1>Felicidadees te has registrado con Exito!</h1>
        <p>Tus datos registrados:<br>
        Nombre: ${respuestas.Username} <br>
        Email: ${respuestas.Email} <br>
        Telefono: ${codigo.innerHTML} ${telefono.value}
        </p>
    `;
    
    console.log(respuestas);
});

