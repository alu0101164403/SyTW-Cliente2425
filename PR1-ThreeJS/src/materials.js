import * as THREE from 'three';

export function getRandomMaterial() {
    const materials = [
        new THREE.MeshStandardMaterial({
            color: Math.random() * 0xffffff,
            roughness: 0.5,
            metalness: 0.8,
        }),
        new THREE.MeshLambertMaterial({
            color: Math.random() * 0xffffff,
        }),
        new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffffff,
            shininess: 100,
            specular: 0xffffff,
        }),
        new THREE.MeshBasicMaterial({
            color: Math.random() * 0xffffff,
            wireframe: true,
        }),
        new THREE.MeshPhysicalMaterial({
            color: Math.random() * 0xffffff,
            roughness: 0.2,
            clearcoat: 0.8,
            reflectivity: 0.9,
        }),
    ];
    return materials[Math.floor(Math.random() * materials.length)];
}
