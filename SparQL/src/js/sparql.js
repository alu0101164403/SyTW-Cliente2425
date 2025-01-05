export async function fetchSPARQLData(query) {
    const endpoint = "http://localhost:8080/http://datos.gob.es/virtuoso/sparql"; 

    try {
        const url = `${endpoint}?query=${encodeURIComponent(query)}`; 

        const response = await fetch(url, {
            method: "GET",  
            headers: {
                "Accept": "application/sparql-results+json",  
                "User-Agent": "Mozilla/5.0"
            },
            redirect: "follow"  
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la consulta SPARQL: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data.results.bindings;
    } catch (error) {
        console.error("Error al obtener datos SPARQL:", error);
        return [];
    }
}
