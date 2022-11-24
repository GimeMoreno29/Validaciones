export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= "";
    } else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput, input);
    }
}

    const tipoDeErrores = [
        "valueMissing",
        "typeMismatch",
        "patternMismatch",
        "customError",
    ];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener 1 letra minuscula , una letra mayuscula , un numero y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo numero no puede etar vacio",
        patternMismatch: "El formato requerido es XXX XXX XXXX 10 numeros",
    },
    direccion: {
        valueMissing: "Este campo direccion no puede etar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo ciudad no puede etar vacio",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres",
    },
    provincia: {
        valueMissing: "Este campo provincia no puede etar vacio",
        patternMismatch: "La provincia debe contener entre 4 a 30 caracteres",
    },
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    
    if(!mayorDeEdad(fechaCliente)){
        mensaje ="Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
        console.log(fechaActual);
        console.log(diferenciaFechas);
    
    return diferenciaFechas <= fechaActual;
}