import * as THREE from "three";
import { scene } from "./scene.js";
import { loadingManager } from "./load.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(loadingManager);

loader.load("../models/projects.glb", function (gltf) {
  const model = gltf.scene;
  model.traverse((node) => {
    node.castShadow = true;
    if (node.isMesh) {
      node.castShadow = true;
    }
  });

  [
    "Lights_Lights_0",
    "Wheel001_Lights_0",
    "Wheel_Lights_0",
    "Face_Lights_0",
  ].forEach((name) => {
    model.getObjectByName(name).material = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0xFF8700),
        emissiveIntensity: 5
      });
  });

  scene.add(model);
});
