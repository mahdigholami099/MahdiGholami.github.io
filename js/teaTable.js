import { scene } from "./scene.js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load(
  "../models/teaTable.glb",
  function (gltf) {
    // Add the loaded model to the scene
    const model = gltf.scene;
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    scene.add(model);
  },
  function (xhr) {
    // Progress callback (optional)
    // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // Error callback (optional)
    console.error("Error loading .glb file:", error);
  }
);

loader.load(
  "../models/tableLamp.glb",
  function (gltf) {
    // Add the loaded model to the scene
    const model = gltf.scene;
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    scene.add(model);

    const color = new THREE.Color(10, 10, 10);

    model.getObjectByName("Object_7").material = new THREE.MeshStandardMaterial(
      {
        color: color,
        emissive: color,
        emissiveIntensity: 0,
      }
    );
    model.getObjectByName("Object_8").material = new THREE.MeshStandardMaterial(
      {
        color: color,
        emissive: color,
        emissiveIntensity: 0,
      }
    );

    const pLightTable = new THREE.PointLight(
      new THREE.Color(150, 150, 150),
      0.08,
      2
    );
    pLightTable.position.set(9.077, 1.3, 1.936);
    scene.add(pLightTable);
  },
  function (xhr) {
    // Progress callback (optional)
    // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // Error callback (optional)
    console.error("Error loading .glb file:", error);
  }
);


loader.load(
  "../models/cactus.glb",
  function (gltf) {
    // Add the loaded model to the scene
    const model = gltf.scene;
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    scene.add(model);
  },
  function (xhr) {
    // Progress callback (optional)
    // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // Error callback (optional)
    console.error("Error loading .glb file:", error);
  }
);

loader.load(
  "../models/remote.glb",
  function (gltf) {
    // Add the loaded model to the scene
    const model = gltf.scene;
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    scene.add(model);
  },
  function (xhr) {
    // Progress callback (optional)
    // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // Error callback (optional)
    console.error("Error loading .glb file:", error);
  }
);