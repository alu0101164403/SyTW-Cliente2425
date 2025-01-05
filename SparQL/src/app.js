import { fetchSPARQLData } from "./js/sparql.js";

document.addEventListener("DOMContentLoaded", () => {
    const testButton = document.createElement("button");
    testButton.textContent = "Probar Consulta SPARQL";
    document.body.appendChild(testButton);

    testButton.addEventListener("click", async () => {
        const query = `
            SELECT DISTINCT ?type
            WHERE {
                ?x a ?type
            } 
            LIMIT 100
        `;

        console.log("Ejecutando consulta SPARQL...");
        try {
            const results = await fetchSPARQLData(query);
            console.log("Resultados obtenidos:", results);
        } catch (error) {
            console.error("Error al ejecutar consulta SPARQL:", error);
        }
    });
});
