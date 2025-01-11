# Informe del Proyecto SPARQL: Descripción, Funcionalidades y Código

## Introducción

Este proyecto consiste en el desarrollo de un sistema interactivo para realizar consultas avanzadas sobre datasets públicos utilizando el lenguaje SPARQL. La plataforma seleccionada para la integración es Datos.gob.es, una fuente oficial de datos abiertos en España que proporciona acceso a una amplia variedad de información estructurada. Este sitio web cuenta con documentación detallada para interactuar con sus datasets mediante SPARQL, además de herramientas útiles para probar y validar consultas.

Enlaces clave proporcionados por Datos.gob.es:

- Documentación de SPARQL
- SPARQL accesible para pruebas

La aplicación desarrollada permite a los usuarios filtrar datasets basándose en una variedad de criterios como región, categoría, entidad publicadora, palabras clave y un rango de fechas de publicación. Una vez ejecutada la consulta, los resultados se presentan de manera estructurada y clara, resaltando detalles como el título del dataset, la fecha de publicación, el nombre completo de la entidad publicadora y las palabras clave asociadas. 

## Estructura del Proyecto

app.js: Gestiona la interacción con el usuario, captura eventos, y realiza consultas dinámicas basadas en los filtros seleccionados.
sparql.js: Contiene las funciones que interactúan con el endpoint SPARQL para realizar consultas y procesar los resultados.

```bash
SPARQL/
├── src/                   # Carpeta principal del código fuente del proyecto.
│   ├── js/                # Carpeta para los archivos JavaScript.
│   │   ├── sparql.js      # Archivo que contiene las funciones para realizar consultas SPARQL y manejar las respuestas.
│   │   └──  app.js         # Archivo principal que conecta la interfaz de usuario con las consultas SPARQL.  
│   └── styles/            # Carpeta para los css.
│       └── styles.css     # Hoja de estilos.
├── index.html             # Archivo principal de la interfaz web.
├── package.json           
├── proxy-server.js        # Servidor proxy para redirigir las solicitudes SPARQL y evitar problemas de CORS.
└── README.md              # Informe del proyecto
```

## Explicación del Código

### Consultas SPARQL

El proyecto utiliza varias consultas para obtener datos específicos. Al inicio ejecuta unas consultas para obtener las regiones, entidades publicadoras y categorías existentes de los dataset. Con estos datos se rellena los desplegables del formulario que el usuario usará para filtrar los dataset.

- Prefijos Utilizados

    Aunque no se especifican explícitamente en las consultas actuales, los prefijos son fundamentales en SPARQL para abreviar URIs largas. Los siguientes prefijos son relevantes para este proyecto:

    - dcat: – Para vocabulario de catálogo de datos.
        
        URI base: <http://www.w3.org/ns/dcat#>

        Usado para propiedades como dcat:Dataset, dcat:keyword, y dcat:distribution.
    - dct: – Para términos de metadatos de Dublin Core.

        URI base: <http://purl.org/dc/terms/>

        Usado para propiedades como dct:title, dct:issued, dct:publisher, y dct:spatial.
    - skos: – Para esquemas de organización del conocimiento.

        URI base: <http://www.w3.org/2004/02/skos/core#>

        Usado para propiedades como skos:prefLabel.

- Consulta para regiones:

```js
SELECT DISTINCT ?option WHERE {
    ?dataset <http://purl.org/dc/terms/spatial> ?option.
}
```

Propósito: Obtener todas las regiones disponibles en los datasets.
Predicado: <http://purl.org/dc/terms/spatial> describe la ubicación geográfica asociada al dataset.


- Consulta para publicadores (publisherQuery):

```js
SELECT DISTINCT ?publicador ?label WHERE {
    ?x a <http://www.w3.org/ns/dcat#Dataset> .
    ?x <http://purl.org/dc/terms/publisher> ?publicador.
    ?publicador <http://www.w3.org/2004/02/skos/core#prefLabel> ?label.
}
```
Propósito: Recuperar una lista de entidades publicadoras con sus nombres descriptivos.

Predicado: <http://purl.org/dc/terms/publisher> se utiliza para asociar datasets con sus publicadores, y <http://www.w3.org/2004/02/skos/core#prefLabel> obtiene el nombre legible de cada publicador.

- Consulta para categorías (categoryQuery):

```js
SELECT DISTINCT ?option WHERE {
    ?dataset <http://www.w3.org/ns/dcat#theme> ?option.
}
```
Propósito: Obtener categorías temáticas de los datasets.

Predicado: <http://www.w3.org/ns/dcat#theme> categoriza los datasets.

- Consulta principal (query):

```js
const query = `
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    SELECT DISTINCT ?dataset ?title ?issued ?publisherName ?keyword WHERE {
        ?dataset a dcat:Dataset .
        ?dataset dct:title ?title .
        OPTIONAL { ?dataset dct:issued ?issued . }
        OPTIONAL {
            ?dataset dct:publisher ?publisher .
            ?publisher skos:prefLabel ?publisherName .
        }
        OPTIONAL { ?dataset dcat:keyword ?keyword . }
        ${region ? `?dataset dct:spatial <${region}>.` : ''}
        ${publisher ? `?dataset dct:publisher <${publisher}>.` : ''}
        ${category ? `?dataset dcat:theme <${category}>.` : ''}
        ${keyword ? `FILTER(CONTAINS(LCASE(?keyword), "${keyword.toLowerCase()}"))` : ''}
        ${startDate ? `FILTER(?issued >= "${startDate}"^^xsd:date)` : ''}
        ${endDate ? `FILTER(?issued <= "${endDate}"^^xsd:date)` : ''}
    } LIMIT 1000
`;
```

- Tripletas Principales:

    - ?dataset a <http://www.w3.org/ns/dcat#Dataset>.
    Filtra los recursos que son de tipo dcat:Dataset.
    - ?dataset <http://purl.org/dc/terms/title> ?title.
    Obtiene el título del dataset (dct:title).
    - OPTIONAL { ?dataset <http://purl.org/dc/terms/issued> ?issued. }
    Recupera opcionalmente la fecha de publicación (dct:issued).
    - OPTIONAL { ?dataset <http://www.w3.org/ns/dcat#keyword> ?keyword. }
    Recupera las palabras clave asociadas (dcat:keyword).
    - OPTIONAL { ?dataset <http://purl.org/dc/terms/publisher> ?publisher. ?publisher <http://www.w3.org/2004/02/skos/core#prefLabel> ?publisherName. }
    Obtiene opcionalmente el publicador y su nombre legible (skos:prefLabel).

    Filtros Dinámicos:

    - ?dataset <http://purl.org/dc/terms/spatial> <${region}>.
    Filtra por región seleccionada.
    - ?dataset <http://purl.org/dc/terms/publisher> <${publisher}>.
    Filtra por publicador seleccionado.
    - ?dataset <http://www.w3.org/ns/dcat#theme> <${category}>.
    Filtra por categoría seleccionada.
    - FILTER(CONTAINS(LCASE(?keyword), "${keyword.toLowerCase()}"))
    Filtra datasets que contengan palabras clave específicas.
    - FILTER(?issued >= "${startDate}"^^xsd:date)
    Filtra datasets publicados después de una fecha específica.
    - FILTER(?issued <= "${endDate}"^^xsd:date)
    Filtra datasets publicados antes de una fecha específica.

    Propósito: Esta consulta combina todos los criterios seleccionados por el usuario en el formulario y recupera los datasets que cumplan con dichos criterios. Los resultados incluyen:

    - El URI del dataset (?dataset).
    - El título del dataset (?title).
    - La fecha de publicación (?issued).
    - El nombre del publicador (?publisherName).
    - Las palabras clave (?keyword).

### Funciones en sparql.js

- fetchOptions:

    a) Propósito: Ejecutar consultas para llenar desplegables de filtros del formualario.

    b) Funcionamiento:
    - Realiza una solicitud HTTP al endpoint SPARQL.
    - Analiza la respuesta en formato XML.
    - Extrae las URIs y etiquetas necesarias.

- executeQuery:

    a) Propósito: Ejecutar la consulta principal y procesar los resultados teniendo en cuenta los filtros introducidos por el usuario.

    b) Funcionamiento:

    - Almacena los resultados en un mapa para agrupar datasets por URI.
    - Agrega palabras clave asociadas.
    - Convierte el mapa en una lista de objetos para facilitar la visualización.

### Funciones en app.js

- populateSelect:

    a) Propósito: Poblar los desplegables de la interfaz con las opciones obtenidas de fetchOptions.

    b) Funcionamiento:

    - Recibe el ID del select, la consulta y el binding que contiene los datos.
    - Inserta las opciones en el elemento HTML correspondiente.

- displayResults:

    a) Propósito: Mostrar los resultados en forma de tarjetas.

    b) Funcionamiento:

    - Toma los resultados de executeQuery.
    - Genera dinámicamente el HTML para cada tarjeta.
    - Implementa una función de formato para fechas (substr) que muestra solo la parte de la fecha.
    - Detalles de la Interfaz

## Conclusión
Este proyecto combina consultas SPARQL dinámicas y una interfaz amigable para proporcionar a los usuarios un sistema eficiente de exploración de datos públicos.