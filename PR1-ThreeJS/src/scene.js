import * as THREE from 'three';
import { getRandomMaterial } from './materials.js';

// Geometrías aleatorias
export function getRandomGeometry() {
    const geometries = [
        new THREE.BoxGeometry(),
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.ConeGeometry(0.5, 1, 16),
        new THREE.TorusGeometry(0.5, 0.2, 16, 100),
    ];
    return geometries[Math.floor(Math.random() * geometries.length)];
}

// Escena aleatoria
export function generateRandomScene(scene, plane, light, ambientLight) {
    // Limpia la escena anterior
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Agrega el suelo y la iluminación de nuevo
    scene.add(plane, light, ambientLight);

    // Crea entre 3 y 6 objetos aleatorios con materiales variados
    const objectCount = Math.floor(Math.random() * 4) + 3;
    for (let i = 0; i < objectCount; i++) {
        const geometry = getRandomGeometry();
        const material = getRandomMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.position.set(
            (Math.random() - 0.5) * 5,
            Math.random() * 2,
            (Math.random() - 0.5) * 5
        );
        mesh.name = geometry.type;
        scene.add(mesh);
    }
    scene.background = new THREE.Color(0x87cefa);
}
