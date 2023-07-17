import { scene, renderer, camera } from "./scene.js";
import * as THREE from 'three';


// Create a geometry
const geometry = new THREE.BoxGeometry();

// Create a material
const material = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa // Adjust emissive intensity
});

// Create a mesh with the geometry and material
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
// Add the mesh to the scene
scene.add(cube);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene with the camera
  renderer.render(scene, camera);
}

// Start the animation loop
// animate();
renderer.render(scene, camera);