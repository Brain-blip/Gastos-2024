// Selección de elementos del DOM
const formulario = document.getElementById('Agregar-gastos');
const listaGastos = document.querySelector('#gastos ul');

document.addEventListener('DOMContentLoaded', pedirPresupuesto);
formulario.addEventListener('submit', agregarGasto);

// Clase para manejar el presupuesto
class Presupuesto {
    constructor(cantidad) {
        this.presupuesto = Number(cantidad); 
        this.restante = Number(cantidad);    
        this.gastos = [];                    
    }

    // Agregar un gasto y recalcular el restante
    agregarGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    } calcularRestante() {
        const totalGastado = this.gastos.reduce((total, gasto) => total + gasto.Valor, 0);
        this.restante = this.presupuesto - totalGastado;
    } eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }
}

// Clase para manejar la interfaz
class UI {
    mostrarPresupuesto(cantidad) {
        document.querySelector('#total').textContent = cantidad.presupuesto;
        document.querySelector('#restante').textContent = cantidad.restante;
    }

    // Muestra un mensaje de alerta
    mostrarAlerta(mensaje, tipo) {
        const alerta = document.createElement('div');
        alerta.classList.add('alert', 'text-center', tipo === 'error' ? 'alert-danger' : 'alert-success');
        alerta.textContent = mensaje;
        document.querySelector('.contenido-gastos').insertBefore(alerta, formulario);

        // Eliminar alerta
        setTimeout(() => alerta.remove(), 3000);

    } agregarGastoALista(gasto) {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        item.dataset.id = gasto.id;
        item.innerHTML = `${gasto.Nombre} <span style="color: black; font-weight: bold; class="badge badge-primary badge-pill">$${gasto.Valor}</span><button class="btn btn-danger btn-sm borrar-gasto">Borrar</button>`;
        listaGastos.appendChild(item);
        // Eliminar
        item.querySelector('.borrar-gasto').addEventListener('click', () => {
            presupuesto.eliminarGasto(gasto.id);
            this.actualizarListaGastos(presupuesto.gastos);
            this.mostrarPresupuesto(presupuesto);
        });
    }actualizarListaGastos(gastos) {
        listaGastos.innerHTML = '';
        gastos.forEach(gasto => this.agregarGastoALista(gasto));
    }
}
    const ui = new UI();
    let presupuesto;
    function pedirPresupuesto() {
        const cantidad = prompt('¿Cuál es tu presupuesto?');
    if (cantidad === '' || cantidad === null || isNaN(cantidad) || Number(cantidad) <= 0) {
        window.location.reload();
    } else {
        presupuesto = new Presupuesto(cantidad);
        ui.mostrarPresupuesto(presupuesto);
    }
}
    function agregarGasto(e) {
        e.preventDefault();
        //valores del formulario   
        const Nombre = document.querySelector('#gasto').value;
        const Valor = Number(document.querySelector('#cantidad').value);
        if (Nombre === '' || Valor === '') {
            ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        } else if (Valor <= 0 || isNaN(Valor)) {
            ui.mostrarAlerta('El Valor debe ser positivo', 'error');
        }else if (Valor > presupuesto.restante) {
            ui.mostrarAlerta('Presupuesto insuficiente para este gasto', 'error');
        }
        else {
            const gasto = { Nombre, Valor, id: Date.now() };
            presupuesto.agregarGasto(gasto);
            ui.mostrarAlerta('Gasto agregado correctamente', 'exito');
            ui.agregarGastoALista(gasto);
            ui.mostrarPresupuesto(presupuesto);
            formulario.reset();
        }
    }