import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { generateRandomScene } from './scene.js';
import { addLighting } from './light.js';

//--- Elementos HTML ---//

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

// Obtener las luces al llamar a la función
const { ambientLight, directionalLight, pointLight, spotLight } = addLighting(scene);

// Suelo
const planeGeometry = new THREE.PlaneGeometry(10, 10);
//const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xebf0ef });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;


// Agregar elementos iniciales a la escena
generateRandomScene(scene, plane, directionalLight, ambientLight);

// Controles orbitales
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animación de un objeto aleatorio
let animatedObject = null;
let animationDirection = 1; // Dirección de la animación, 1 hacia arriba, -1 hacia abajo
let animationSpeed = 0.05;

// Seleccion de objeto aleatorio y animarlo
function selectRandomObjectForAnimation() {
    const objects = scene.children.filter(child => child instanceof THREE.Mesh && child !== plane);
    if (objects.length > 0) {
        animatedObject = objects[Math.floor(Math.random() * objects.length)];
    }
}

// Movimiento de  objeto de arriba a abajo
function animateObject() {
    if (animatedObject) {
        animatedObject.position.y += animationDirection * animationSpeed;

        // Si llega al limite, vuelve a su posicion original
        if (animatedObject.position.y > 2) {
            animationDirection = -1;
        } else if (animatedObject.position.y < 0.5) {
            animationDirection = 1;
        }
    }
}

// Detectar clic
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener('click', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const geometry = clickedObject.geometry;

        // Calcular información de la geometría
        const vertices = geometry.attributes.position.array.length / 3;
        const faces = geometry.index ? geometry.index.count / 3 : vertices / 3;
        const edges = geometry.index ? geometry.index.count : faces * 3;

        infoPanel.innerHTML = `
            <p><strong>Objeto:</strong> ${clickedObject.name}</p>
            <p><strong>Tipo:</strong> ${geometry.type}</p>
            <p><strong>Vértices:</strong> ${vertices}</p>
            <p><strong>Aristas:</strong> ${edges}</p>
            <p><strong>Caras:</strong> ${faces}</p>
            <p><strong>Color:</strong> ${clickedObject.material.color.getStyle()}</p>
        `;

        downloadButton.style.display = 'block';

        // Descargar malla
        downloadButton.onclick = () => {
            const exporter = new GLTFExporter();
            exporter.parse(
                clickedObject,
                (gltf) => {
                    const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${clickedObject.name}.gltf`;
                    a.click();
                },
                { binary: false }
            );
        };
    }
});

// Botón para generar nueva escena
newSceneButton.addEventListener('click', () => {
    generateRandomScene(scene, plane, directionalLight, ambientLight);
    selectRandomObjectForAnimation(); // Nuevo objeto a animar
});

// Animación
function animate() {
    requestAnimationFrame(animate);
    
    animateObject();

    controls.update();
    renderer.render(scene, camera);
}
animate();

selectRandomObjectForAnimation();
