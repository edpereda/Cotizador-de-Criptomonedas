class Interfaz{

    constructor() {
        this.init();
    }

    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                // crear un select
                const select = document.getElementById('criptomoneda');

                // recorrer monedas
                for( const [key, value] of Object.entries(monedas.monedas.Data) ) {
                    // añadir el Symbol y el Nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));

                    // añadimos opcion a select
                    select.appendChild(opcion);
                }
                
                
            })
    }

    mostrarMensaje (mensaje){
        let resultado = document.getElementById('resultado');
        resultado.innerHTML =   `<p>${mensaje}</p>
                                `;
        resultado.style.display = 'block';
        resultado.className = 'warning bg-warning text-light w-100';

        setTimeout(() => {
            resultado.style.display = 'none';
        },3000);

    };

    // Muestra spinner
    mostrarSpinner () {
        document.querySelector('.contenido-spinner').style.display = "block";
    }

    // Oculta spinner
    ocultarSpinner () {
        document.getElementById('spinner').style.display = "none";
    }

    // Imprime el resultado de la cotizacion
    mostrarResultado (resultado, moneda, crypto){
        

        console.log(resultado[crypto][moneda]);
        const datosMoneda = resultado[crypto][moneda];

        // recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2);
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');

        // construir el template
        let templateHTML =  `
                            <div class="card bg-warning">
                                <div class ="card-body text-light">
                                    <h2 class="card-title">Resultado:</h2>
                                    <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de : $ ${precio}</p>
                                    <p>Variacion último día: % ${porcentaje}</p>
                                    <p>Ultima Actualizacion: ${actualizado}</p>
                                </div>
                            </div>
                            `;
        
        ui.mostrarSpinner();

        setTimeout(() => {
            ui.ocultarSpinner();
            document.querySelector('#resultado').innerHTML = templateHTML;
        }, 2000);

        //insertar el resultado


    }
}