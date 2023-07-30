import * as THREE from "three";
import { scene, camera, controls } from "./scene.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { Menu } from "./menuClass.js";

const XPosition = -9.532;
const YPosition = 8;
const ZPosition = -4;
const YStepAdder = 1.5;

const buttonContainer = document.querySelector(".button-container");
const prevButton = document.getElementById("previous-btn");
const closeButton = document.getElementById("close-btn");
const nextButton = document.getElementById("next-btn");

const mySkill = new Menu(
  [new THREE.Vector3(-3, 10, -5), new THREE.Vector3(-3, 2.5, -5)],
  [new THREE.Vector3(-3, 9, -8.06), new THREE.Vector3(-3, 2, -8.06)],
  [35, 55],
  [115, 95],
  [-45, -45],
  [45, 45],
  [3, 3],
  [4, 4],
  buttonContainer,
  prevButton,
  closeButton,
  nextButton
);

const mySkillsOnClick = () => {
  mySkill.start();
};
const myProjectsOnClick = () => {};
const aboutMeOnClick = () => {};

const MenuList = [
  { text: "My Skills", onClick: mySkillsOnClick },
  { text: "My Done Projects", onClick: myProjectsOnClick },
  { text: "About Me", onClick: aboutMeOnClick },
];

const fontLoader = new FontLoader();

MenuList.forEach((slot, index) => {
  fontLoader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const textGeometry = new TextGeometry(slot.text, {
        font: font,
        size: 0.5, // Adjust the size of the text
        height: 0, // Extrusion depth (0 for 2D, positive or negative value for 3D)
      });

      // Center the text
      textGeometry.computeBoundingBox();
      const textWidth =
        textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
      const textHeight =
        textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;
      textGeometry.translate(-textWidth / 2, -textHeight / 2, 0);

      // Create a 3D plane
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
      plane.position.set(XPosition, YPosition - YStepAdder * index, ZPosition);
      plane.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
      plane.category = "Menu";

      const textMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 1,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.castShadow = true;
      plane.add(textMesh);

      plane.hover = () => {
        textMesh.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 3,
        });
      };
      plane.unhover = () => {
        textMesh.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 1,
        });
      };
      plane.click = slot.onClick;

      scene.add(plane);
    }
  );
});
