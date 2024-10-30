let tasaDeCambio = null;

async function obtenerCotizacionUSD() {
    const urlUSD = 'https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones';

    try {
        const response = await fetch(urlUSD);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const usdCotizacion = data.results && data.results.detalle 
            ? data.results.detalle.find(item => item.codigoMoneda === 'USD')
            : null;

        tasaDeCambio = usdCotizacion ? usdCotizacion.tipoCotizacion : null;
        return tasaDeCambio;

    } catch (error) {
        console.error("Error al obtener la cotización del dólar:", error);
        tasaDeCambio = null;
    }
}
