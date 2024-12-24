import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { generateRandomScene } from './scene.js';

// Elementos HTML
const container = document.getElementById('container');
const infoPanel = document.getElementById('object-info');
const downloadButton = document.getElementById('download-button');
const newSceneButton = document.getElementById('new-scene-button');

// Escena, cámara, y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// Iluminación
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
light.castShadow = true;

// Suelo
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;

// Agrega elementos iniciales a la escena
scene.add(plane, ambientLight, light);

// Controles orbitales
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Detección de clic
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener('click', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const geometry = clickedObject.geometry;

        // Calcular información de la geometría
        const vertices = geometry.attributes.position.count;
        const faces = geometry.index ? geometry.index.count / 3 : vertices / 3;
        const edges = faces * 3 / 2;

        // Mostrar información en el panel
        infoPanel.innerHTML = `
            <p>Objeto: ${clickedObject.name}</p>
            <p>Vértices: ${vertices}</p>
            <p>Aristas (aprox.): ${Math.round(edges)}</p>
            <p>Caras: ${faces}</p>
        `;

        downloadButton.style.display = 'block';

        // Descargar malla
        downloadButton.onclick = () => {
            const exporter = new THREE.BufferGeometryExporter();
            const json = exporter.parse(clickedObject.geometry);
            const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${clickedObject.name}.json`;
            a.click();
        };
    }
});

// Botón para generar una nueva escena
newSceneButton.addEventListener('click', () => {
    generateRandomScene(scene, plane, light, ambientLight);
});

// Animación
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
