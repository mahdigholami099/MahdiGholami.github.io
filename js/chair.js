import { scene } from "./scene.js";
import { loadingManager } from "./load.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(loadingManager);

loader.load("../models/gamingChair.glb", function (gltf) {
  const model = gltf.scene;
  model.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  scene.add(model);
});
