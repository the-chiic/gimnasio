let socios= new Map([
    [1, {nombre: "Adrián", email: "adririsco05@gmail.com"}],
    [2, {nombre: "Pedro", email: "prisco67@gmail.com"}],
    [3, {nombre: "Carolina", email: "carolina05@gmail.com"}]
]);

let clases= new Map([
    [1, {nombre: "1DAW", instructor: "Isa", cupo: 1}],
    [2, {nombre: "2DAW", instructor: "Alberto", cupo: 20}],
    [3, {nombre: "1ASIR", instructor: "Manolo", cupo: 20}],
    [4, {nombre: "2ASIR", instructor: "Ernesto", cupo: 15}],
]);

let inscripciones=[
    {idSocio: 1, idClase: 1},
    {idSocio: 1, idClase: 2},
    {idSocio: 2, idClase: 1},
    {idSocio: 3, idClase: 3},
    {idSocio: 3, idClase: 4},
];


function introducirSocios(){
    let sw=0;
    do{
        let idSocio=parseInt(prompt("ID del Socio: "));
        if(idSocio>0){
            while(socios.has(idSocio)){
                console.log("ID Repetido");
                console.log(" ");
                idSocio=parseInt(prompt("ID del Socio: "));
            }

            let nombre=prompt("Nombre del Socio: ");
            let email=prompt("Email del Socio: ");

            while(Array.from(socios.values()).some(elemento => elemento.email==email)){
                console.log("Email Repetido");
                console.log(" ");
                email=prompt("Email del Socio: ");
            }

            socios.set(idSocio, {nombre, email});
            console.log("Socio Introducido");
            console.log(" ");
        }else{
            sw=1;
        }
    }while(sw==0);
}

function comprobarSocio(idSocio){
    return socios.has(idSocio);
}

function visualizarSocios(){
    socios.forEach((socio, i) => {
        console.log("ID: "+i);
        console.log("Nombre: "+socio.nombre);
        console.log("Email: "+socio.email);
        console.log(" ");
    });
}

function introducirClases(){
    let sw=0;
    do{
        let idClase=parseInt(prompt("ID de la Clase: "));
        if(idClase>0){
            while(clases.has(idClase) || isNaN(idClase)){
                if(clases.has(idClase)){
                    console.log("ID Repetido");
                    console.log(" ");
                }else{
                    console.log("ID No Válido");
                    console.log(" ");
                }
                idClase=parseInt(prompt("ID de la Clase: "));
            }

            let nombre=prompt("Nombre de la Clase: ");

            while(Array.from(clases.values()).some(elemento => elemento.nombre==nombre)){
                console.log("Nombre Repetido");
                console.log(" ");
                nombre=prompt("Nombre de la Clase: ");
            }

            let instructor=prompt("Nombre del Instructor: ");
            let cupo=parseInt(prompt("Cupo de la Clase: "));

            while(isNaN(cupo) || cupo<=0){
                console.log("Cupo No Válido");
                console.log(" ");
                cupo=parseInt(prompt("Cupo de la Clase: "));
            }

            clases.set(idClase, {nombre, instructor, cupo});
            console.log("Clase Introducida");
            console.log(" ");
        }else{
            sw=1;
        }
    }while(sw==0);
}

function comprobarClase(idClase){
    return clases.has(idClase);
}

function visualizarClases(){
    clases.forEach((clase, i) => {
        console.log("ID: "+i);
        console.log("Nombre: "+clase.nombre);
        console.log("Instructor: "+clase.instructor);
        console.log("Cupo: "+clase.cupo);
        console.log(" ");
    });
}

function buscarClasesNombre(nombre){
    let sw=0;
    clases.forEach((clase, i) => {
        if(clase.nombre.toLowerCase()==nombre){
            sw=1;
            console.log("Clase Encontrada");
            console.log(" ");
            console.log("ID: "+i);
            console.log("Instructor: "+clase.instructor);
            console.log("Cupo: "+clase.cupo);
            console.log(" ");
        }
    });

    if(sw==0){
        console.log("Clase No Encontrada");
        console.log(" ");
    }
}

function buscarClasesInstructor(instructor){
    let sw=0;
    clases.forEach((clase, i) => {
        if(clase.instructor.toLowerCase()==instructor){
            sw=1;
            console.log("Instructor Encontrado");
            console.log(" ");
            console.log("ID: "+i);
            console.log("Nombre: "+clase.nombre);
            console.log("Cupo: "+clase.cupo);
            console.log(" ");
        }
    });

    if(sw==0){
        console.log("Instructor No Encontrado");
        console.log(" ");
    }
}

function inscripcion(idSocio, idClase){
    let swSocio=comprobarSocio(idSocio);
    let swClase=comprobarClase(idClase);
    let swInscripcion=comprobarInscripcion(idSocio, idClase);
    if(swInscripcion==false){
        if(swSocio==true && swClase==true){
            claseCupo=clases.get(idClase);

            if(claseCupo.cupo>0){
                claseCupo.cupo--;
                inscripciones.push({
                    idSocio: idSocio,
                    idClase: idClase
                });
                console.log("Inscrito");
                console.log(" ");
            }else{
                console.log("No Hay Cupo");
                console.log(" ");
            }
            
        }else{
            console.log("Socio o Clase No Encontrada");
            console.log(" ");
        }
    }else{
        console.log("Socio Ya Inscrito En Esa Clase");
        console.log(" ");
    }
}

function comprobarInscripcion(idSocio, idClase){
    let sw=0;
    inscripciones.forEach(inscripcion => {
        if(inscripcion.idSocio==idSocio && inscripcion.idClase==idClase){
            sw=1;
        }
    });

    if(sw==1)
        return true;
    return false;
}

function visualizarInscripciones(){
    inscripciones.forEach(inscripcion => {
        console.log("ID del Socio: "+inscripcion.idSocio);
        console.log("ID de la Clase: "+inscripcion.idClase);
        console.log(" ");
    });
}

function mostrarClasesInscritasDeCadaSocio(){
    let sociosInscritos=[];
    inscripciones.forEach(inscripcion => {
        if(!sociosInscritos.includes(inscripcion.idSocio)){
            sociosInscritos.push(inscripcion.idSocio);
        }
    });

    sociosInscritos.forEach(socioInscrito => {
        let socio=socios.get(socioInscrito);
        console.log(socio.nombre);

        let clasesInscritas=inscripciones.filter(elemento => elemento.idSocio==socioInscrito);
        
        clasesInscritas.forEach(claseInscrita => {
            let clase=clases.get(claseInscrita.idClase);
            console.log(clase.nombre);
        });
        console.log(" ");
    });
}

function mostrarClasesConCupos(){
    clases.forEach((clase, i) => {
        if(clase.cupo>0){
            console.log("ID: "+i);
            console.log("Nombre: "+clase.nombre);
            console.log("Instructor: "+clase.instructor);
            console.log("Cupo: "+clase.cupo);
            console.log(" ");
        }
    });
}

function sociosInscritosInstructor(){
    clasesInscritas=[];

    inscripciones.forEach(inscripcion => {
        if(!clasesInscritas.includes(inscripcion.idClase)){
            clasesInscritas.push(inscripcion.idClase);
        }
    });

    clasesInscritas.forEach(claseInscrita => {
        let clase=clases.get(claseInscrita);
        console.log("Instructor: "+clase.instructor);

        let sociosInscritos=inscripciones.filter(elemento => elemento.idClase==claseInscrita);
        sociosInscritos.forEach(socioInscrito => {
            let socio=socios.get(socioInscrito.idSocio);
            console.log(socio.nombre);
        });
        console.log(" ");
    });
}


function menu(){
    let op;
    do{
        console.log("Menú");
        console.log("0.- Salir");
        console.log("1.- Introducir Socios");
        console.log("2.- Visualizar Socios");
        console.log("3.- Introducir Clases");
        console.log("4.- Visualizar Clases");
        console.log("5.- Buscar Clases Por Nombre");
        console.log("6.- Buscar Clases Por Instructor");
        console.log("7.- Inscribir un Socio a Una Clase");
        console.log("8.- Visualizar Inscripciones");
        console.log("9.- Mostrar las Clases Inscritas de Cada Socio");
        console.log("10.- Mostrar las Clases con Cupos");
        console.log("11.- Socios Inscritos por Instructor");
        console.log(" ");
        op=parseInt(prompt("Elige una Opción (0-11): "));
        

        switch(op){
            case 0:
                console.log("Saliendo...");
                break;
            case 1:
                introducirSocios();
                break;
            case 2:
                visualizarSocios();
                break;
            case 3:
                introducirClases();
                break;
            case 4:
                visualizarClases();
                break;
            case 5:
                visualizarClases();
                let nombre=prompt("Nombre de la Clase a Buscar: ");
                nombre=nombre.toLowerCase();
                buscarClasesNombre(nombre);
                break;
            case 6:
                visualizarClases();
                let instructor=prompt("Nombre del Instructor a Buscar: ");
                instructor=instructor.toLowerCase();
                buscarClasesInstructor(instructor);
                break;
            case 7:
                visualizarSocios();
                let idSocio=parseInt(prompt("ID del Socio a Inscribir: "));
                visualizarClases();
                let idClase=parseInt(prompt("ID de la Clase Donde Inscribir: "));
                inscripcion(idSocio, idClase);
                break;
            case 8:
                visualizarInscripciones();
                break;
            case 9:
                mostrarClasesInscritasDeCadaSocio();
                break;
            case 10:
                mostrarClasesConCupos();
                break;
            case 11:
                sociosInscritosInstructor();
                break;
            default:
                console.log("Opción No Válida");
                console.log(" ");
                break;
        }
    }while(op!=0);
}


menu();