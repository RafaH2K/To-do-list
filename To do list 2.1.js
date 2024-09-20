document.addEventListener("DOMContentLoaded", function(){
let arrayTarea = JSON.parse(localStorage.getItem("arrayTarea")) || [];
const botonAgregar = document.getElementById("btnAdd");
botonAgregar.addEventListener('click', () => {
    const tareaNombre = document.getElementById("nombreDeTarea").value.trim();
    const estado = document.getElementById("estado").value;
    const detalle = document.getElementById("detallesDeTarea").value;

    if (tareaNombre === "") {
        alert("Por favor, ingrese un nombre de tarea válido");
    } else {
        const tarea = {
            nombre: tareaNombre,
            estado: estado,
            detalle: detalle
        };
        arrayTarea.push(tarea);
        localStorage.setItem("arrayTarea", JSON.stringify(arrayTarea));
        MostrarTarea();
    }
});

function MostrarTarea() {
    let sinIniciar = "";
    let enProceso = "";
    let terminada = "";
    for (let i = 0; i < arrayTarea.length; i++) {
        const tarea = arrayTarea[i];
        let html = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${tarea.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${tarea.estado}</h6>
                    <p class="card-text">${tarea.detalle}</p>
                    <button type="button" class="btn" id="btnCambioAEnProceso${i}">Cambiar estado</button>
                </div>
            </div>
        `;
        if (tarea.estado === "Sin iniciar") {
            sinIniciar += html;
        } else if (tarea.estado === "En proceso") {
            enProceso += html;
        } else if (tarea.estado === "Terminada") {
            terminada += html;
        }
    }
    document.getElementById("listaActividadesSinIniciar").innerHTML = sinIniciar;
    document.getElementById("listaActividadesEnProceso").innerHTML = enProceso;
    document.getElementById("listaActividadesTerminada").innerHTML = terminada;

    for (let i = 0; i < arrayTarea.length; i++) {
        const botonCambio = document.getElementById(`btnCambioAEnProceso${i}`);
        botonCambio.addEventListener('click', () => {
            if (arrayTarea[i].estado === "Sin iniciar") {
                arrayTarea[i].estado = "En proceso";
            } else if (arrayTarea[i].estado === "En proceso") {
                arrayTarea[i].estado = "Terminada";
            } else if (arrayTarea[i].estado === "Terminada") {
                arrayTarea[i].nombre = `<del>${arrayTarea[i].nombre}</del>`;
            }
            localStorage.setItem("arrayTarea", JSON.stringify(arrayTarea));
            MostrarTarea();
        });
    }
}
MostrarTarea();
});
