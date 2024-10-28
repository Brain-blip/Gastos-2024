//variables para los selectores
const formulario = document.getElementById('Agregar-gastos');
const listado = document.getElementById('#gastos ul');

//creacion de eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarpresupuesto);
    formulario.addEventListener('submit',agregarGasto);
}

//crear la clase principal
class Presupuesto
{
    constructor(presupuesto)
    { 
        this.presupuesto = Number(presupuesto);
        this.restante = Number();
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [... this.gastos,gasto]
        this.calcularRestante();
    }
    calcularRestante(){
        
    }
}
//clase que maneja la interfaz de usuario
class UI 
{
    insertarpresupuesto(cantidad){
        document.querySelector('#total').textContent = cantidad.presupuesto;
        document.querySelector('#restante').textContent = cantidad.presupuesto;
    }
    ImprimirAlerta(mensaje,tipo){

        //crear el div
        const divmensaje = document.createElement('div');
        divmensaje.classList.add('text-center','alert');

        //si es de tipo error se debe agregar a la clase
        if(tipo === 'error'){
            divmensaje.classList.add('alert-danger');
        }else{
            divmensaje.classList.add('alert-primary');
        }
        //mensaje de error
        divmensaje.textContent = mensaje;
        //insertar en el DOM
        document.querySelector('.contenido-gastos').insertBefore(divmensaje,formulario);

        //programar el tiempo que dura la alerta
        setTimeout(()=>{
            document.querySelector('.contenido-principal .alert').remove();
        },3000);
    }

    //insertar el gasto en la lista
agregarGastolistadi(gastos){

}
}


//crear un objeto de la clase UI
const ui = new UI();
let presupuesto;

function preguntarpresupuesto(){
    const valorpre = prompt('Ingresar el valor del presupuesto');

    //validar lo ingresado por el usuario
    if(valorpre === ''|| valorpre === null || isNaN(valorpre || valorpre <= 0))
    {
        window.location.reload();
    }
    //presupuesto es valido
    presupuesto = new Presupuesto(valorpre);

    console.log(valorpre);
    //mostrar en html el valor del presupuesto ingresado
    ui.insertarpresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();

    //definir las variables del formulario
    const Nombre = document.querySelector('#gasto').value;
    const Valor = Number(document.querySelector('#cantidad').value);

    //validar los campos del formulario
    if(Nombre === '' ||  Valor === ''){
        ui.ImprimirAlerta('Ambos campos son obligatorios','error');
        //return;
    }else if(Valor < 0 || isNaN(Valor)){
        ui.ImprimirAlerta('El valor no es correcto','error');
    }
}