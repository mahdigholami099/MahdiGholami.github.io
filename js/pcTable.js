import { scene } from "./scene.js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load(
  "../models/pcTable.glb",
  function (gltf) {
    const model = gltf.scene;
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    scene.add(model);

    function animate() {
      requestAnimationFrame(animate);
      for (let i = 18; i <= 22; i++) {
        const time = performance.now() / 1000 + (i - 17) / 6;
        const hue = (time % 10) / 10;
        const color = new THREE.Color().setHSL(hue, 1, 0.5);

        model.getObjectByName(`PCTable_${i}`).material =
          new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 10,
          });
      }
      const time = performance.now() / 1000;
      const hue = (time % 10) / 10;
      const color = new THREE.Color().setHSL(hue, 1, 0.5);
      model.getObjectByName("PCTable_13").material =
        new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 2,
        });
      model.getObjectByName("PCTable_11").material =
        new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.6,
        });
      model.getObjectByName("PCTable_10").material =
        new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.6,
        });
      model.getObjectByName("PCTable_6").material =
        new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.6,
        });
    }
    animate();
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
