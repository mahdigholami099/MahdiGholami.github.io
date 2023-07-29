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
controls.enablePan = false;
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 1.8;
controls.minAzimuthAngle = -Math.PI / 11;
controls.maxDistance = 40;
controls.minDistance = 30;
camera.position.set(20, 20, 20);


scene.background = new THREE.Color(0x333333);
scene.backgroundBlurriness = 1;

// commented becuse of postprocess
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
animate();


export { scene, renderer, camera, controls };
