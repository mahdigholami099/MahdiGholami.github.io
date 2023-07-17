import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(20, 20, 20);
controls.update();

scene.background = new THREE.Color(0x333333);
scene.backgroundBlurriness = 1;

// commented becuse of postprocess
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();


export { scene, renderer, camera };
