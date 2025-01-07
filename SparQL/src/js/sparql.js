const sparqlEndpoint = 'http://localhost:8080/http://datos.gob.es/virtuoso/sparql';

export async function fetchOptions(query, bindingName = "option") {
    try {
        const response = await fetch(`${sparqlEndpoint}?query=${encodeURIComponent(query)}&format=application/sparql-results+xml`, {
            headers: {
                "Accept": "application/sparql-results+xml",
                "Origin": "http://localhost",
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();

        // Analizar el XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        // Extraer datos basados en el nombre del binding (option, publicador, etc.)
        const options = Array.from(xmlDoc.querySelectorAll("result")).map(result => {
            const uriElement = result.querySelector(`binding[name='${bindingName}'] uri`);
            const labelElement = result.querySelector("binding[name='label'] literal");

            const uri = uriElement ? uriElement.textContent : null; // Verificar existencia de URI
            const label = labelElement
                ? labelElement.textContent // Usar el label si está presente
                : uri
                ? uri.split('/').pop().replace(/-/g, ' ') // Si no hay label, usar el URI
                : 'Sin nombre'; // En caso de error, mostrar "Sin nombre"

            return { uri, label };
        });

        return options.filter(option => option.uri); // Filtrar resultados sin URI
    } catch (error) {
        console.error('Error al realizar la consulta SPARQL:', error);
        return [];
    }
}



export async function executeQuery(query) {
    try {
        const response = await fetch(`${sparqlEndpoint}?query=${encodeURIComponent(query)}`, {
            headers: {
                "format": "application/sparql-results+xml",
                "Origin": "http://localhost",
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();

        // Analizar el XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        // Extraer los resultados
        const results = Array.from(xmlDoc.querySelectorAll("result")).map(result => {
            const title = result.querySelector("binding[name='title'] literal")?.textContent || 'Sin título';
            const publisher = result.querySelector("binding[name='publisher'] uri")?.textContent || 'Desconocido';
            return { title, publisher };
        });

        return results;
    } catch (error) {
        console.error('Error al ejecutar la consulta SPARQL:', error);
        return [];
    }
}
