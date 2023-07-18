import { scene } from "./scene.js";
import { loadingManager } from "./load.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(loadingManager);

loader.load("../models/floor.glb", function (gltf) {
  const model = gltf.scene;
  model.traverse((node) => {
    if (node.isMesh) {
      node.receiveShadow = true;
    }
  });
  scene.add(model);
});

loader.load("../models/wall.glb", function (gltf) {
  const model = gltf.scene;
  model.traverse((node) => {
    if (node.isMesh) {
      node.receiveShadow = true;
    }
  });
  scene.add(model);
});
