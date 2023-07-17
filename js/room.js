import { scene } from "./scene.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load(
  "../models/floor.glb",
  function (gltf) {
    // Add the loaded model to the scene
    const model = gltf.scene;
    model.traverse((node) => {
      if (node.isMesh) {
        node.receiveShadow = true;
      }
    });
    scene.add(model);
  },
  function (xhr) {
    // Progress callback (optional)
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // Error callback (optional)
    console.error("Error loading .glb file:", error);
  }
);

loader.load(
  "../models/wall.glb",
  function (gltf) {
    // Add the loaded model to the scene
    const model = gltf.scene;
    model.traverse((node) => {
      if (node.isMesh) {
        node.receiveShadow = true;
      }
    });
    scene.add(model);
  },
  function (xhr) {
    // Progress callback (optional)
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // Error callback (optional)
    console.error("Error loading .glb file:", error);
  }
);
