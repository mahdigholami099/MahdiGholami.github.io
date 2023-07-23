import { scene } from "./scene.js";
import * as THREE from "three";
import { loadingManager } from "./load.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const loader = new GLTFLoader(loadingManager);

loader.load("../models/certificates.glb", function (gltf) {
  const model = gltf.scene;
  model.traverse((node) => {
    node.castShadow = true;
    if (node.isMesh) {
      node.castShadow = true;
    }
  });

  const advancedMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.98, 0.84, 0.2),
  });
  const intermediateMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.75, 0.75, 0.75),
  });

  [
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0002",
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0003",
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0004",
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0005",
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0006",
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0007",
  ].forEach((name) => {
    model.getObjectByName(name).material = advancedMat;
  });
  [
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0",
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0001",
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0008",
    "Metal_Aluminum_Anodized_Gold_24k_Polished_0009",
  ].forEach((name) => {
    model.getObjectByName(name).material = intermediateMat;
  });

  scene.add(model);
});

const certificatesTextList = [
  {
    text: "JS",
    description: "Intermediate",
    material: {
      titleSize: 0.1,
      descSize: 0.05,
      titleColor: new THREE.Color(0.75, 0.75, 0.75),
      descColor: new THREE.Color(0.75, 0.75, 0.75),
    },
    textPosition: new THREE.Vector3(-4.82, 9.05, -8.072),
    descPosition: new THREE.Vector3(-4.82, 8.85, -8.02),
  },
  {
    text: "C++",
    description: "Advanced",
    material: {
      titleSize: 0.1,
      descSize: 0.05,
      titleColor: new THREE.Color(0.98, 0.84, 0.2),
      descColor: new THREE.Color(0.98, 0.84, 0.2),
    },
    textPosition: new THREE.Vector3(-3.96, 9.05, -8.072),
    descPosition: new THREE.Vector3(-3.96, 8.85, -8.02),
  },
  {
    text: "UE",
    description: "Advanced",
    material: {
      titleSize: 0.1,
      descSize: 0.05,
      titleColor: new THREE.Color(0.98, 0.84, 0.2),
      descColor: new THREE.Color(0.98, 0.84, 0.2),
    },
    textPosition: new THREE.Vector3(-3.14, 9.05, -8.072),
    descPosition: new THREE.Vector3(-3.14, 8.85, -8.02),
  },
  {
    text: "Python",
    description: "Advanced",
    material: {
      titleSize: 0.1,
      descSize: 0.05,
      titleColor: new THREE.Color(0.98, 0.84, 0.2),
      descColor: new THREE.Color(0.98, 0.84, 0.2),
    },
    textPosition: new THREE.Vector3(-2.315, 9.05, -8.072),
    descPosition: new THREE.Vector3(-2.315, 8.85, -8.02),
  },
  {
    text: "RUST",
    description: "Intermediate",
    material: {
      titleSize: 0.1,
      descSize: 0.05,
      titleColor: new THREE.Color(0.75, 0.75, 0.75),
      descColor: new THREE.Color(0.75, 0.75, 0.75),
    },
    textPosition: new THREE.Vector3(-1.48, 9.05, -8.072),
    descPosition: new THREE.Vector3(-1.48, 8.85, -8.02),
  },
];

certificatesTextList.forEach((conf) => {
  const fontLoader = new FontLoader();
  fontLoader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const textGeometry = new TextGeometry(conf.text, {
        font: font,
        size: conf.material.titleSize, // Adjust the size of the text
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
      plane.position.set(
        conf.textPosition.x,
        conf.textPosition.y,
        conf.textPosition.z
      );
      plane.rotation.set((-16 * Math.PI) / 180, 0, 0);

      const textMaterial = new THREE.MeshStandardMaterial({
        emissive: conf.material.titleColor,
        emissiveIntensity: 0.7
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.castShadow = true;
      plane.add(textMesh);

      scene.add(plane);
    }
  );

  fontLoader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const textGeometry = new TextGeometry(conf.description, {
        font: font,
        size: conf.material.descSize, // Adjust the size of the text
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
      plane.position.set(
        conf.descPosition.x,
        conf.descPosition.y,
        conf.descPosition.z
      );
      plane.rotation.set((-16 * Math.PI) / 180, 0, 0);

      const textMaterial = new THREE.MeshStandardMaterial({
        emissive: conf.material.descColor,
        emissiveIntensity: 0.8
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.castShadow = true;
      plane.add(textMesh);

      scene.add(plane);
    }
  );
});
