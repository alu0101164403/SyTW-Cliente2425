import { fetchOptions } from './js/sparql.js';

document.addEventListener('DOMContentLoaded', () => {
    const regionQuery = `
        SELECT DISTINCT ?option WHERE {
            ?dataset <http://purl.org/dc/terms/spatial> ?option.
        }
    `;

    const publisherQuery = `
        SELECT DISTINCT ?publicador ?label WHERE {
            ?x a <http://www.w3.org/ns/dcat#Dataset> .
            ?x <http://purl.org/dc/terms/publisher>
            ?publicador. ?publicador <http://www.w3.org/2004/02/skos/core#prefLabel> ?label.
        }
    `;

    const categoryQuery = `
        SELECT DISTINCT ?option WHERE {
            ?dataset <http://www.w3.org/ns/dcat#theme> ?option.
        }
    `;

    populateSelect('region', regionQuery, 'option');
    populateSelect('publisher', publisherQuery, 'publicador');
    populateSelect('category', categoryQuery, 'option');

    document.getElementById('filterForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const region = document.getElementById('region').value;
        const publisher = document.getElementById('publisher').value;
        const category = document.getElementById('category').value;
        const keyword = document.getElementById('keyword').value;

        const query = `
            SELECT DISTINCT ?dataset ?title ?publisher WHERE {
                ?dataset a <http://www.w3.org/ns/dcat#Dataset>.
                ${region ? `?dataset <http://purl.org/dc/terms/spatial> <${region}>.` : ''}
                ${publisher ? `?dataset <http://purl.org/dc/terms/publisher> <${publisher}>.` : ''}
                ${category ? `?dataset <http://www.w3.org/ns/dcat#theme> <${category}>.` : ''}
                ${keyword ? `?dataset <http://www.w3.org/ns/dcat#keyword> "${keyword}".` : ''}
                ?dataset <http://purl.org/dc/terms/title> ?title.
                ?dataset <http://purl.org/dc/terms/publisher> ?publisher.
            } LIMIT 100
        `;

        const results = await executeQuery(query);
        displayResults(results);
    });
});

async function populateSelect(selectId, query, bindingName = "option") {
    const selectElement = document.getElementById(selectId);
    try {
        const options = await fetchOptions(query, bindingName);
        selectElement.innerHTML = '<option value="">Seleccione una opción</option>';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.uri; 
            optionElement.textContent = option.label;
            selectElement.appendChild(optionElement);
        });
    } catch (error) {
        selectElement.innerHTML = '<option value="">Error al cargar opciones</option>';
        console.error(`Error al cargar ${selectId}:`, error);
    }
}


function displayResults(results) {
    const resultList = document.getElementById('resultList');
    resultList.innerHTML = '';

    results.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = `Título: ${result.title}, Publicador: ${result.publisher}`;
        resultList.appendChild(listItem);
    });
}
