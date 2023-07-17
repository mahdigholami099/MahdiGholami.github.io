import * as THREE from "three";
import { scene } from "./scene.js";

const dLight = new THREE.DirectionalLight("0xFFFFFF", 0.2);
dLight.position.set(20, 20, 20);
dLight.castShadow = true;
dLight.shadow.camera.left = -50;
dLight.shadow.camera.right = 50;
dLight.shadow.camera.bottom = -50;
dLight.shadow.camera.top = 50;


scene.add(dLight);
