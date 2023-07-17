import { scene } from "./scene.js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load(
  "../models/tv.glb",
  function (gltf) {
    // Add the loaded model to the scene
    const model = gltf.scene;

    const textureLoader = new THREE.TextureLoader();
    const gifTextureFrames = [];
    for (let i = 0; i <= 114; i++) {
      gifTextureFrames.push(textureLoader.load(`../movie/spider-man/${i}.jpg`));
    }

    model.getObjectByName("Object_252").material = new THREE.MeshBasicMaterial({
      map: gifTextureFrames[0],
    });

    const intensity = 0.2;
    const distance = 10;
    const decay = 6;

    const topLeft = new THREE.PointLight(
      new THREE.Color(1, 1, 1),
      intensity,
      distance,
      decay
    );
    const topRight = new THREE.PointLight(
      new THREE.Color(1, 1, 1),
      intensity,
      distance,
      decay
    );
    const bottomLeft = new THREE.PointLight(
      new THREE.Color(1, 1, 1),
      intensity,
      distance,
      decay
    );
    const bottomRight = new THREE.PointLight(
      new THREE.Color(1, 1, 1),
      intensity,
      distance,
      decay
    );

    topLeft.position.set(0.54, 5.5, -9.2);
    topRight.position.set(6.1, 5.5, -9.2);
    bottomLeft.position.set(0.54, 2.4, -9.2);
    bottomRight.position.set(6.1, 2.4, -9.2);

    scene.add(topLeft);
    scene.add(topRight);
    scene.add(bottomLeft);
    scene.add(bottomRight);

    scene.add(model);
    function animate() {
      requestAnimationFrame(animate);
      const currentFrame = Math.floor((performance.now() / 100) % 115);
      model.getObjectByName("Object_252").material.map =
        gifTextureFrames[currentFrame];

      function getAvrageUsedColor(imageData) {
        const data = imageData.data;
        let r = 0;
        let g = 0;
        let b = 0;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        r /= data.length;
        g /= data.length;
        b /= data.length;

        return new THREE.Color(r,g,b);
      }

      const canvas = document.createElement("canvas");
      canvas.width = gifTextureFrames[currentFrame].image.width;
      canvas.height = gifTextureFrames[currentFrame].image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(gifTextureFrames[currentFrame].image, 0, 0);

      const topLeftColor = getAvrageUsedColor(ctx.getImageData(0, 0, canvas.width / 2, canvas.height /2));
      const topRightColor = getAvrageUsedColor(ctx.getImageData(canvas.width / 2, 0, canvas.width, canvas.height));
      const bottomLeftColor = getAvrageUsedColor(ctx.getImageData(0, canvas.height /2, canvas.width / 2, canvas.height /2));
      const bottomRightColor = getAvrageUsedColor(ctx.getImageData(canvas.width / 2, canvas.height /2, canvas.width, canvas.height));

      topLeft.color.set(topLeftColor);
      topRight.color.set(topRightColor);
      bottomLeft.color.set(bottomLeftColor);
      bottomRight.color.set(bottomRightColor);
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
