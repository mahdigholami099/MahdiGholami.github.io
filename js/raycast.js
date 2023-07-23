import * as THREE from "three";
import { scene, camera } from "./scene.js";

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let hoveredObject;

const onMouseMove = (event) => {
  // calculate pointer position in normalized device coordinates
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // hover and unhover
  if (intersects.length == 0) {
    if (hoveredObject !== undefined) {
      hoveredObject.unhover(hoveredObject);
      hoveredObject = undefined;
    }
    return;
  }
  let obj = intersects[0].object;
  while (obj.parent !== scene) {
    obj = obj.parent;
  }

  if (!obj.hasOwnProperty("hover")) {
    if (hoveredObject !== undefined) {
      hoveredObject.unhover(hoveredObject);
      hoveredObject = undefined;
    }
    return;
  }

  if (hoveredObject !== obj) {
    obj.hover();
    if (hoveredObject !== undefined) hoveredObject.unhover();
    hoveredObject = obj;
  }
};

const onMouseClick = (event) => {
  // calculate pointer position in normalized device coordinates
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length == 0) {
    if (hoveredObject !== undefined) {
      hoveredObject.unhover(hoveredObject);
      hoveredObject = undefined;
    }
    return;
  }
  let obj = intersects[0].object;
  while (obj.parent !== scene) {
    obj = obj.parent;
  }

  if (obj.hasOwnProperty("click")) obj.click();
};

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("click", onMouseClick);
