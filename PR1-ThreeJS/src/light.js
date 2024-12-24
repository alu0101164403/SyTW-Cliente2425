import * as THREE from 'three';

export function addLighting(scene) {
    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Luz de punto (resalta áreas específicas)
    const pointLight = new THREE.PointLight(0xff0000, 1, 50);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Foco
    const spotLight = new THREE.SpotLight(0x00ff00, 1, 20, Math.PI / 6);
    spotLight.position.set(-5, 10, -5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    return { ambientLight, directionalLight, pointLight, spotLight };
}
