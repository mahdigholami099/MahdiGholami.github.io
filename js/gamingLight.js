import { scene } from "./scene.js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load(
  "../models/gamingLight.glb",
  function (gltf) {
    // Add the loaded model to the scene
    const model = gltf.scene;
    scene.add(model);

    const pLightTable = new THREE.PointLight(
      new THREE.Color(255, 0, 50),
      0.03,
      10
    );
    pLightTable.position.set(-3, 6, 3.9);
    scene.add(pLightTable);

    function animate() {
      requestAnimationFrame(animate);

      const time = performance.now() / 1000;
      const hue = (time % 10) / 10;
      const color = new THREE.Color().setHSL(hue, 1, 0.5);
      const cssColor = color.getStyle();
      const rgbArray = cssColor
        .substring(cssColor.indexOf("(") + 1, cssColor.lastIndexOf(")"))
        .split(",")
        .map((value) => parseInt(value.trim()));

      const [red, green, blue] = rgbArray;
      pLightTable.color.set(new THREE.Color(red, green, blue));
      model.traverse((node) => {
        if (node.isMesh) {
          node.material = new THREE.MeshStandardMaterial({
            color: color,
            //   emissive: color,
            //   emissiveIntensity: 0.6,
          });
        }
      });
    }
    animate();
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
