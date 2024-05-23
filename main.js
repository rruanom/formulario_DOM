//Variables
let generos = ["Accion", "Drama", "Comedia", "Romántica", "Ciencia Ficción"];
const fragment = document.createDocumentFragment();
const formularioGenero = document.querySelector("#genero");
const filtroGenero = document.querySelector("#filtrar");
const listaFiltrada = document.querySelector(".listaFiltrada");
const formulario = document.querySelector(".formulario");
let listaPeliculas = [];
let listasUnicas= [];

//Eventos

formulario.addEventListener("submit", (ev) =>{
    ev.preventDefault();
    let tituloForm = formulario.tituloPelicula.value;
    let directorForm = formulario.directorPelicula.value;
    let yearForm = formulario.yearPelicula.value;
    let generoForm = formulario.genero.value;

    validarGuardarDatos(tituloForm,directorForm,yearForm,generoForm);
});

filtroGenero.addEventListener("change", (ev)=>{
    listaFiltrada.innerHTML = "";
    let select = document.getElementById("filtrar");
    let generoSeleccionado = select.value;//da el valor de select
    if (generoSeleccionado == "---"){//funciona
        let fila = document.createElement("tr");
        let columna = document.createElement("td");

        columna.setAttribute("colspan", "4");
        columna.textContent = "No se ha seleccionado ningun género"

        fila.append(columna);
        listaFiltrada.append(fila);
    } else if (generoSeleccionado== "Todos") {//funciona
        listaPeliculas.forEach((element)=>{
            let celda = pintarFila(element);
            fragment.append(celda);
        });
        listaFiltrada.append(fragment);
    } else {
        console.log("he entrado en lista");
        let tablaFiltrada1 =filtrarCrearTabla(generoSeleccionado)
        console.log(tablaFiltrada1);
        listaFiltrada.append(tablaFiltrada1);
    }
});

//Funciones
const crearDesplegable = (...args)=>{
    args.forEach((element) =>{
        const generoOption = document.createElement("option");
        generoOption.value = element;
        generoOption.text = element;

        fragment.append(generoOption);
    })
    return fragment
};

const validarTitulo= (tituloSinValidar) =>{
    let regExpTitulo = /^[a-zA-Z0-9\s.,'!?-ñÑ]+$/
    return regExpTitulo.test(tituloSinValidar)
}

const validarDirector= (DirectorSinValidar) =>{
    let regExpTitulo = /^[a-zA-Z\s.-ñÑ]+$/;
    return regExpTitulo.test(DirectorSinValidar)
}

const validarYear= (yearSinValidar) =>{
    actualYear= new Date().getFullYear();
    if( yearSinValidar >= 1800 && yearSinValidar  <= actualYear) {
        return true
    } else {
        return false
    }
};

const crearAlert = (listaErrores) => {
    let alerta = "";
    listaErrores.forEach((element)=>{
        alerta = alerta + "\n" + element
    })
    return alerta
};

const validarGuardarDatos = (titulo1, director1, year1, genero1)=>{
    let errores=["Tienes los siguientes errores: "];

    if (!validarTitulo(titulo1)) {
        errores.push("el titulo no es correcto")
    };
    if (!validarDirector(director1)) {
        errores.push("el director no es correcto")
    };
    if (!validarYear(year1)) {
        errores.push("el año no es correcto")
    };
    if (genero1 == "--Elige el género---"){
        errores.push("Elige un género")
    } 

    if (errores.length == 1) {
        let nuevaPelicula = {
        titulo: titulo1,
        director: director1,
        year: year1,
        genero: genero1
        };
        listaPeliculas.push(nuevaPelicula);
        listasUnicas = filtrarGeneros(listaPeliculas);
        filtroGenero.innerHTML= "";
        filtroGenero.append(crearDesplegable("---","Todos", ...listasUnicas));
        activarFiltro();
        formulario.reset();
    } else {
        let alerta = crearAlert(errores);
        alert(alerta);
    }
}

const filtrarGeneros = (arr)=>{
    let arr1 = [];
    arr.forEach((element)=>{
        arr1.push(element.genero)
    })
    return new Set(arr1);
};

const activarFiltro = ()=>{
    if (listaPeliculas.length != 0){
        filtroGenero.disabled = false;
    }
};

const pintarFila = (objTabla)=>{
    const fila = document.createElement("tr")
    const values = Object.values(objTabla);
    values.forEach((element)=>{
        const celda = document.createElement("td");
        celda.textContent = element;
        fila.append(celda)
    })
    return fila
}

const filtrarCrearTabla = (valorSeleccionado)=>{
    console.log("he entrado en filtrarCrearTabla")
    let listaTabla = listaPeliculas.filter(element => element.genero == valorSeleccionado);
    console.log(listaTabla);
    listaTabla.forEach((element)=>{
        fragment.append(pintarFila(element))
    })
    return fragment;
}


formularioGenero.append(crearDesplegable("--Elige el género---", ...generos));
