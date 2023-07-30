import * as THREE from "three";
import { scene } from "./scene.js";
import { loadingManager } from "./load.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const loader = new GLTFLoader(loadingManager);

loader.load("../models/books.glb", function (gltf) {
  const model = gltf.scene;
  model.traverse((node) => {
    node.castShadow = true;
    if (node.isMesh) {
      node.castShadow = true;
    }
  });

  [
    ["Mesh", 0xff8700],
    ["Mesh001", 0x9b9a69],
    ["Mesh002", 0xe5c066],
    ["Mesh003", 0x23b061],
    ["Mesh004", 0x1848b3],
  ].forEach((item) => {
    model.getObjectByName(item[0]).material = new THREE.MeshStandardMaterial({
      color: item[1],
    });
  });

  // books title
  [
    {
      text: "TAURI",
      position: new THREE.Vector3(-4.96, 2.11, -8),
      rotation: new THREE.Vector3(0, 0, -80),
      size: 0.1,
      color: new THREE.Color(0.75, 0.75, 0.75),
    },
    {
      text: "DJANGO",
      position: new THREE.Vector3(-4.54, 2.11, -8),
      rotation: new THREE.Vector3(0, 0, -72),
      size: 0.1,
      color: new THREE.Color(0.75, 0.75, 0.75),
    },
    {
      text: "REACT",
      position: new THREE.Vector3(-3.2, 1.75, -8),
      rotation: new THREE.Vector3(0, 0, 0),
      size: 0.1,
      color: new THREE.Color(0.75, 0.75, 0.75),
    },
    {
      text: "REST API",
      position: new THREE.Vector3(-3.2, 1.47, -8),
      rotation: new THREE.Vector3(0, 0, 0),
      size: 0.1,
      color: new THREE.Color(0.75, 0.75, 0.75),
    },
    {
      text: "SQL",
      position: new THREE.Vector3(-1.52, 2.1, -8),
      rotation: new THREE.Vector3(0, 0, -298),
      size: 0.1,
      color: new THREE.Color(0.75, 0.75, 0.75),
    },
  ].forEach((conf) => {
    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        const textGeometry = new TextGeometry(conf.text, {
          font: font,
          size: conf.size, // Adjust the size of the text
          height: 0.01, // Extrusion depth (0 for 2D, positive or negative value for 3D)
        });

        // Center the text
        textGeometry.computeBoundingBox();
        const textWidth =
          textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        const textHeight =
          textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;
        textGeometry.translate(-textWidth / 2, -textHeight / 2, 0);

        const planeGeometry = new THREE.PlaneGeometry(
          textGeometry.boundingBox.max.x * 2,
          textGeometry.boundingBox.max.y * 2
        );
        const planeMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(conf.position.x, conf.position.y, conf.position.z);
        plane.rotation.set(
          (conf.rotation.x * Math.PI) / 180,
          (conf.rotation.y * Math.PI) / 180,
          (conf.rotation.z * Math.PI) / 180
        );

        const textMaterial = new THREE.MeshStandardMaterial({
          emissive: conf.color,
          emissiveIntensity: 0.7,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.castShadow = true;
        plane.add(textMesh);

        scene.add(plane);
      }
    );
  });

  scene.add(model);
});
