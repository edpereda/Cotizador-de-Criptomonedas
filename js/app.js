const cotizador = new API('0c8f93ef213c466b4faff731189d610654aa4e2271b0aff0bdee0a4525e3bd8c');
const ui = new Interfaz();


// leer el formulario
const formulario = document.getElementById('formulario');


// eventListener
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    

    // leer datos 
    let moneda = document.getElementById('moneda');
    let criptomoneda = document.getElementById('criptomoneda');

    // verificar datos vacios
    if (moneda.value === '' || criptomoneda.value === ''){
        ui.mostrarMensaje('Ambos campos son obligatorios');
    }else{
        // ingresar datos

        cotizador.obtenerValores(moneda.value, criptomoneda.value)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, moneda.value, criptomoneda.value);
            });
    }
});