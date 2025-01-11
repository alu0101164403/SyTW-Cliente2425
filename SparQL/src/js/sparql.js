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

            const uri = uriElement ? uriElement.textContent : null;
            const label = labelElement
                ? labelElement.textContent 
                : uri
                ? uri.split('/').pop().replace(/-/g, ' ') 
                : 'Sin nombre'; 

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
        const response = await fetch(`${sparqlEndpoint}?query=${encodeURIComponent(query)}&format=application/sparql-results+xml`, {
            headers: {
                "Accept": "application/sparql-results+xml",
                "Origin": "http://localhost",
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        // Mapa para agrupar datos por dataset URI
        const datasetMap = new Map();

        // Procesar cada resultado de la consulta SPARQL
        Array.from(xmlDoc.querySelectorAll("result")).forEach(result => {
            const datasetUri = result.querySelector("binding[name='dataset'] uri")?.textContent;
            if (!datasetUri) return;

            const title = result.querySelector("binding[name='title'] literal")?.textContent || 'Sin título';
            const issued = result.querySelector("binding[name='issued'] literal")?.textContent || 'Desconocido';
            const publisherName = result.querySelector("binding[name='publisherName'] literal")?.textContent || 'Desconocido';
            const keyword = result.querySelector("binding[name='keyword'] literal")?.textContent || null;

            // Si el dataset ya está en el mapa, actualizamos sus valores
            if (datasetMap.has(datasetUri)) {
                const existingData = datasetMap.get(datasetUri);
                if (keyword) existingData.keywords.add(keyword);
            } else {
                // Si no está en el mapa, lo añadimos
                datasetMap.set(datasetUri, {
                    dataset: datasetUri,
                    title,
                    issued,
                    publisher: publisherName,
                    keywords: new Set(keyword ? [keyword] : []),
                });
            }
        });
        // Convertir el mapa a una lista de objetos con palabras clave agrupadas
        return Array.from(datasetMap.values()).map(dataset => ({
            ...dataset,
            keywords: Array.from(dataset.keywords),
        }));
    } catch (error) {
        console.error('Error al ejecutar la consulta SPARQL:', error);
        return [];
    }
}
