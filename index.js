const NOMBRE_USUARIO_REGEX = /[a-zA-Z][a-zA-Z0-9-_]{4,8}/; 
const EMAIL_REGEX =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; 
const NUMERO_TELEFONO_REGEX = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/; 
const CONTRASEÑA_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,10}$/; 
const CONFIRMAR_CONTRASEÑA_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,10}$/; 
const paises = document.querySelector('#countries');
const ponerNombre = document.querySelector('#username');
const ponerEmail = document.querySelector('#email');
const selectPais = document.querySelector('#countries');
const codigo = document.querySelector('#phone-code');
const telefono = document.querySelector('#phone');
const contra = document.querySelector('#password');
const confirContra = document.querySelector('#confirm-password');

let usernameValidacion = false;
let emailValidacion = false;
let telfValidacion = false;
let passValidacion = false;
let passValidacion2 = false;

[ ... countries].forEach(opciones =>{
    opciones.innerHTML = opciones.innerHTML.split('(')[0];
});

const validaciones = (evento, validaciones, element) =>{
    const imformacion = evento.target.parentElement.children[1];

    if (validaciones){
        element.classList.add('repuestaCorrecta');
        element.classList.remove('repuestaErronea');
        imformacion.classList.remove('mostarinfo')
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
 codigo.innerHTML = `+${selectPais.value}`
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