const NOMBRE_USUARIO_REGEX = /^[a-zA-Z0-9_-]{4,8}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NUMERO_TELEFONO_REGEX = /^[\+]?[(+]?[\d\s\-\(\)]{8,}$/;
const CONTRASEÑA_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const CONFIRMAR_CONTRASEÑA_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const paises = document.querySelector("#countries");
const introducirNombre = document.querySelector("#username");
const introducirEmail = document.querySelector("#email");
const codigoTelefono = document.querySelector("#phone-code");
const telefono = document.querySelector("#phone");
const contrasena = document.querySelector("#password");
const confirmarContrasena = document.querySelector("#confirm-password");
const habilitarBoton = document.querySelector(".habilitar-btn");
const botonRegistrar = document.querySelector("#form-btn");
const activarBoton = document.querySelector("#registrado");
const datosUsuario = document.querySelector(".contenido2");

let nombreValidacion = false;
let emailValidacion = false;
let telfonoValidacion = false;
let constrasenaValidacion = false;
let compararContrasena = false;
let paisesValidacion = false;

[...countries].forEach((opciones) => {
  opciones.innerHTML = opciones.innerHTML.split("(")[0];
});

const validaciones = (evento, validaciones, element) => {
  const informacion = evento.target.parentElement.children[1];
  const opcionesValidas =
    nombreValidacion &&
    emailValidacion &&
    telfonoValidacion &&
    constrasenaValidacion &&
    compararContrasena &&
    paisesValidacion;
  if (opcionesValidas) {
    habilitarBoton.classList.remove("habilitar-btn");
  } else {
    habilitarBoton.classList.add("habilitar-btn");
  }

  if (validaciones) {
    element.classList.add("repuestaCorrecta");
    element.classList.remove("repuestaErronea");
    informacion.classList.remove("mostarInformacion");
  } else {
    element.classList.add("repuestaErronea");
    element.classList.remove("repuestaCorrecta");
    informacion.classList.add("mostarInformacion");
  }
};

introducirNombre.addEventListener("input", (evento) => {
  nombreValidacion = NOMBRE_USUARIO_REGEX.test(evento.target.value);
  validaciones(evento, nombreValidacion, introducirNombre);
});

introducirEmail.addEventListener("input", (evento) => {
  emailValidacion = EMAIL_REGEX.test(evento.target.value);
  validaciones(evento, emailValidacion, introducirEmail);
});

paises.addEventListener("input", (evento) => {
  const paisSeleccionado = [...evento.target.children].find(
    (option) => option.selected,
  );
  paisesValidacion = paisSeleccionado.value == "" ? false : true;
  //  console.log(validarPais);
  codigoTelefono.innerHTML = `+${paises.value}`;
  paises.classList.add("repuestaCorrecta");
  codigoTelefono.classList.add("repuestaCorrecta");
});

telefono.addEventListener("input", (evento) => {
  telfonoValidacion = NUMERO_TELEFONO_REGEX.test(evento.target.value);
  validaciones(evento, telfonoValidacion, telefono);
  const informacion = evento.target.parentElement.parentElement.children[1];
  if (telfonoValidacion) {
    telefono.classList.add("repuestaCorrecta");
    telefono.classList.remove("repuestaErronea");
    informacion.classList.remove("mostarInformacion");
  } else {
    telefono.classList.add("repuestaErronea");
    telefono.classList.remove("repuestaCorrecta");
    informacion.classList.add("mostarInformacion");
  }
});

contrasena.addEventListener("input", (evento) => {
  constrasenaValidacion = CONTRASEÑA_REGEX.test(evento.target.value);
  validaciones(evento, constrasenaValidacion, contrasena);
});

confirmarContrasena.addEventListener("input", (evento) => {
  compararContrasena = contrasena.value == evento.target.value;
  validaciones(evento, compararContrasena, confirmarContrasena);
});

botonRegistrar.addEventListener("click", (evento) => {
  evento.preventDefault();
  activarBoton.style.display = "flex";
  const respuestas = {
    Username: introducirNombre.value,
    Email: introducirEmail.value,
    Phone: `${codigoTelefono.innerHTML} ${telefono.value}`,
  };
  datosUsuario.innerHTML = `
        <h1>Felicidadees te has registrado con Exito!</h1>
        <p>Tus datos registrados:<br>
        Nombre: ${respuestas.Username} <br>
        Email: ${respuestas.Email} <br>
        Teléfono: ${respuestas.Phone}
        </p>
    `;

  console.log(respuestas);
});
