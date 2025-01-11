import { fetchOptions, executeQuery} from './js/sparql.js';

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
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        const query = `
            SELECT DISTINCT ?dataset ?title ?issued ?accrualPeriodicityLabel ?publisherName ?keyword WHERE {
                ?dataset a <http://www.w3.org/ns/dcat#Dataset>.
                ?dataset <http://purl.org/dc/terms/title> ?title.
                OPTIONAL { ?dataset <http://purl.org/dc/terms/issued> ?issued. }
                OPTIONAL {
                    ?dataset <http://purl.org/dc/terms/publisher> ?publisher.
                    ?publisher <http://www.w3.org/2004/02/skos/core#prefLabel> ?publisherName.
                }
                OPTIONAL { ?dataset <http://www.w3.org/ns/dcat#keyword> ?keyword. }
                ${region ? `?dataset <http://purl.org/dc/terms/spatial> <${region}>.` : ''}
                ${publisher ? `?dataset <http://purl.org/dc/terms/publisher> <${publisher}>.` : ''}
                ${category ? `?dataset <http://www.w3.org/ns/dcat#theme> <${category}>.` : ''}
                ${keyword ? `FILTER(CONTAINS(LCASE(?keyword), "${keyword.toLowerCase()}"))` : ''}
                ${startDate ? `FILTER(?issued >= "${startDate}"^^xsd:date)` : ''}
                ${endDate ? `FILTER(?issued <= "${endDate}"^^xsd:date)` : ''}
            } LIMIT 1000
        `;
        const results = await executeQuery(query);
        console.log('rrr', results);
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
    resultList.innerHTML = ''; // Limpiar resultados anteriores

    if (results.length === 0) {
        resultList.innerHTML = '<p class="no-results-message">No se han encontrado resultados</p>';
        return;
    }

    results.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('card');
        const limitedKeywords = result.keywords.slice(0, 50);

        card.innerHTML = `
            <div class="card-header">
                <h5>${result.title}</h5>
            </div>
            <div class="card-body">
                <p><strong>Fecha de publicación:</strong> ${result.issued}</p>
                <p><strong>Entidad publicadora:</strong> ${result.publisher}</p>
                <div class="keywords">
                    <strong>Palabras clave:</strong>
                    <ul>
                        ${limitedKeywords.length > 0 
                            ? limitedKeywords.map(keyword => `<li>${keyword}</li>`).join('')
                            : '<li>No disponibles</li>'}
                    </ul>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            if (result.dataset) {
                window.open(result.dataset, '_blank');
            } else {
                alert('URL no disponible');
            }
        });

        resultList.appendChild(card);
    });
}

