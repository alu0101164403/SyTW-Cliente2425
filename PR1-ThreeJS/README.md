# Práctica Three.js 

Ainoa Iglesias Dasilva -  Diciembre 2024

Sistemas y Tecnologías Web: Cliente

### Ejecución del Proyecto

Para ejecutar el proyecto, utilice el siguiente comando:

```bash
parcel index.html
```


### Estructura

```bash
PR1-ThreeJS/
│
├── src/
│     ├── main.js           # Script JavaScript que gestiona la escena 3D, interacciones y animaciones.
│     ├── scene.js          # Funciones para generar escenas aleatorias.
│     ├── materials.js      # Funciones para generar materiales aleatorios para los objetos 3D
│     ├── light.js          # Funciones para agregar iluminación a la escena.
│     └── style.css         # Estilos para la interfaz de usuario y elementos HTML.
│
├── index.html              # Documento HTML principal donde se carga la aplicación.
└── package.json            # Configuración del proyecto Parcel.         

```
## General Description(EN)

This project consists of a fairly simple interactive web application that allows to explore a randomly generated 3D scene, where users can interact with 3D objects, getting information about them and can download the mesh in GLTF format. In addition, the application allows to generate new random scenes with different objects and materials.

##  Technical Features

### Technologies Used

- [**Three.js**](https://threejs.org/): JavaScript library for rendering 3D graphics in the browser.
- [**GLTFExporter**](https://threejs.org/docs/#examples/en/exporters/GLTFExporter): Three.js tool to export 3D objects to GLTF format.
- [**OrbitControls**](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls): Three.js add-on for moving the camera with the mouse.
- **WebGL**: API to render 3D graphics using the browser GPU.

### How the application works

#### 3D Scene

1. **Scene Creation**: The scene is generated dynamically using random objects. The objects can be of different types such as cubes, spheres, cones or torus.
   
2. [**Lighting**](https://threejs.org/docs/index.html?q=light#api/en/lights/): Lighting: Various light sources are added to create a realistic lighting environment, using:

    - Ambient Light: Provides soft and uniform illumination.
    - Directional Light: Simulates light from a source such as the sun.
    - Point Light: Gives illumination from a specific point.
    - Spotlight: To highlight objects or elements.

3. **Camera Control**: The camera allows navigation in the scene by means of orbital controls, which facilitates the exploration of the 3D environment. The camera can be manipulated through the mouse to zoom, rotate and pan. This is achieved using the OrbitControls class.

4. **Object Animation**: A random object is selected to be animated, moving cyclically up and down. The animation is controlled by the **animateObject** function, which adjusts the objects position along the Y axis.

#### User Interactions

1. **Object Selection**: Clicking on an object, you get detailed information about its geometry (vertices, edges, faces) and material (color, material type).

2. **Generate New Scene**: The “Generate New Scene” button allows you to create a new random scene with different objects and materials. This is achieved by the **generateRandomScene** function, which cleans up the current scene and adds new objects with random geometry and material settings.

3. **Mesh Download**: Clicking on an object activates a button to download the mesh of the object in GLTF format, allowing the user to save the 3D model on his device.

#### Components and Functions

- **`getRandomGeometry`**: Generates a random geometry (cube, sphere, cone, torus).
- **`getRandomMaterial`**: Returns a random material with different properties such as color, roughness and gloss.
- **`generateRandomScene`**: Creates a random scene by adding 3 to 6 objects with random geometries and materials. It also resets the scene, ensuring that the new objects are the only ones present.
- **`addLighting`**: Configures and adds various light sources to the scene to enhance visual realism.
- AnimateObject`**: Controls the animation of a random object by moving it up and down.

### Style and UI

The style of the interface is simple and functional. The information panel of the selected objects is presented at the top left of the screen, showing data such as object type, number of vertices, edges, faces and color. It also includes buttons to download the object mesh or generate a new scene.


## Descripción General (ES)

Este proyecto consiste en una aplicación web interactiva bastante sencilla que permite explorar una escena 3D generada aleatoriamente, donde los usuarios pueden interactuar con objetos 3D, obteniendo información sobre ellos y pueden descargar la malla en formato GLTF. Además, la aplicación permite generar nuevas escenas aleatorias con diferentes objetos y materiales.

## Características Técnicas

### Tecnologías Utilizadas

- [**Three.js**](https://threejs.org/): Biblioteca JavaScript para renderizar gráficos 3D en el navegador.
- [**GLTFExporter**](https://threejs.org/docs/#examples/en/exporters/GLTFExporter): Herramienta de Three.js para exportar objetos 3D a formato GLTF.
- [**OrbitControls**](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls): Complemento de Three.js que permite mover la cámara con el ratón.
- **WebGL**: API para renderizar gráficos 3D utilizando la GPU del navegador.

### Funcionamiento de la Aplicación

#### Escena 3D

1. **Creación de la Escena**: La escena se genera dinámicamente mediante objetos aleatorios. Los objetos pueden ser de diferentes tipos como cubos, esferas, conos o toros.
   
2. [**Iluminación**](https://threejs.org/docs/index.html?q=light#api/en/lights/): Iluminación: Se añaden varias fuentes de luz para crear un entorno de iluminación realista, utilizando:

    - Luz Ambiental: Proporciona una iluminación suave y uniforme.
    - Luz Direccional: Simula la luz proveniente de una fuente como el sol.
    - Luz Puntual: Da iluminación desde un punto específico.
    - Foco: Para resaltar objetos o elementos.

3. **Control de Cámara**:  La cámara permite la navegación en la escena mediante controles orbitales, lo que facilita la exploración del entorno 3D. La cámara puede ser manipulada a través del ratón para hacer zoom, rotar y desplazarla. Esto se logra usando la clase OrbitControls.

4. **Animación de Objetos**: Un objeto aleatorio es seleccionado para ser animado, moviéndose cíclicamente hacia arriba y hacia abajo. La animación es controlada por la función **animateObject**, que ajusta la posición de los objetos a lo largo del eje Y.

#### Interacciones del Usuario

1. **Selección de Objetos**: Al hacer clic sobre un objeto, se obtiene información detallada de su geometría (vértices, aristas, caras) y material (color, tipo de material).

2. **Generación de Nueva Escena**: El botón "Generar nueva escena" permite crear una nueva escena aleatoria con diferentes objetos y materiales. Esto se logra mediante la función **generateRandomScene**, que limpia la escena actual y agrega nuevos objetos con configuraciones aleatorias de geometría y material.

3. **Descarga de Malla**: Al hacer clic sobre un objeto, se activa un botón para descargar la malla del objeto en formato GLTF, permitiendo que el usuario guarde el modelo 3D en su dispositivo.

#### Componentes y Funciones

- **`getRandomGeometry`**: Genera una geometría aleatoria (cubo, esfera, cono, toro).
- **`getRandomMaterial`**: Devuelve un material aleatorio con diferentes propiedades como color, rugosidad y brillo.
- **`generateRandomScene`**: Crea una escena aleatoria añadiendo entre 3 y 6 objetos con geometrías y materiales aleatorios. También restablece la escena, asegurando que los nuevos objetos sean los únicos presentes.
- **`addLighting`**: Configura y agrega diversas fuentes de luz a la escena para mejorar el realismo visual.
- **`animateObject`**: Controla la animación de un objeto aleatorio moviéndolo hacia arriba y abajo.

### Estilo y UI

El estilo de la interfaz es sencillo y funcional. El panel de información de los objetos seleccionados se presenta en la parte superior izquierda de la pantalla, mostrando datos como el tipo de objeto, número de vértices, aristas, caras y color. También incluye botones para descargar la malla del objeto o generar una nueva escena.