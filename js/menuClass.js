import { camera, controls } from "./scene.js";
import * as THREE from "three";

class Menu {
  #pageNumber;
  #cameraPositions;
  #cameraLookAt;
  #minPolar;
  #maxPolar;
  #minAzimuth;
  #maxAzimuth;
  #minDistance;
  #maxDistance;
  #lastCameraLookAt;
  #currentStage;
  #lastCameraPos;
  // Menu level can have multiple camera position and look-at on next button it can be array or just one position for single stage menu
  constructor(
    cameraPositions,
    cameraLookAt,
    minPolar,
    maxPolar,
    minAzimuth,
    maxAzimuth,
    minDistance,
    maxDistance,
    buttonContainer,
    prevButton,
    closeButton,
    nextButton,
    stageCallBack
  ) {
    if (Array.isArray(cameraPositions)) {
      if (cameraPositions.length === 0)
        throw new Error("cameraPosition is empty array");
      this.#pageNumber = cameraPositions.length;
      this.#cameraPositions = cameraPositions;
      this.#cameraLookAt = cameraLookAt;
      this.#minPolar = minPolar;
      this.#maxPolar = maxPolar;
      this.#minAzimuth = minAzimuth;
      this.#maxAzimuth = maxAzimuth;
      this.#minDistance = minDistance;
      this.#maxDistance = maxDistance;
    } else {
      this.#pageNumber = 1;
      this.#cameraPositions = [cameraPositions];
      this.#cameraLookAt = [cameraLookAt];
      this.#minPolar = [minPolar];
      this.#maxPolar = [maxPolar];
      this.#minAzimuth = [minAzimuth];
      this.#maxAzimuth = [maxAzimuth];
      this.#minDistance = [minDistance];
      this.#maxDistance = [maxDistance];
    }
    this.buttonContainer = buttonContainer;
    this.prevButton = prevButton;
    this.closeButton = closeButton;
    this.nextButton = nextButton;
    this.stageCallBack = stageCallBack;
    this.prevButtonHandler = this.previousPage.bind(this);
    this.nextButtonHandler = this.nextPage.bind(this);
    this.closeButtonHandler = this.close.bind(this);
  }

  #freeCameraLimit() {
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minAzimuthAngle = -Math.PI / 11;
    controls.maxAzimuthAngle = Math.PI / 1.8;
    controls.minDistance = 0;
    controls.maxDistance = 40;
  }

  close() {
    this.prevButton.removeEventListener("click", this.prevButtonHandler);
    this.nextButton.removeEventListener("click", this.nextButtonHandler);
    this.closeButton.removeEventListener("click", this.closeButtonHandler);
    this.stageCallBack(-1);
    this.#freeCameraLimit();
    this.buttonContainer.style.display = "none";

    gsap.to(camera.position, {
      duration: 2,
      x: this.#lastCameraPos.x,
      y: this.#lastCameraPos.y,
      z: this.#lastCameraPos.z,
    });

    gsap.to(this.#lastCameraLookAt, {
      duration: 2,
      x: 0,
      y: 0,
      z: 0,
      onUpdate: () => {
        camera.lookAt(this.#lastCameraLookAt);
        controls.target.copy(this.#lastCameraLookAt);
      },
      onComplete: () => {
        controls.minDistance = 30;
      },
    });
  }

  #goToCurrentStage() {
    this.#freeCameraLimit();

    const targetCameraPos = this.#cameraPositions[this.#currentStage];
    const targetCameraLookAt = this.#cameraLookAt[this.#currentStage];

    gsap.to(camera.position, {
      duration: 2,
      x: targetCameraPos.x,
      y: targetCameraPos.y,
      z: targetCameraPos.z,
    });

    gsap.to(this.#lastCameraLookAt, {
      duration: 2,
      x: targetCameraLookAt.x,
      y: targetCameraLookAt.y,
      z: targetCameraLookAt.z,
      onUpdate: () => {
        camera.lookAt(this.#lastCameraLookAt);
        controls.target.copy(this.#lastCameraLookAt);
      },
      onComplete: () => {
        controls.minPolarAngle =
          (this.#minPolar[this.#currentStage] * Math.PI) / 180;
        controls.maxPolarAngle =
          (this.#maxPolar[this.#currentStage] * Math.PI) / 180;
        controls.minAzimuthAngle =
          (this.#minAzimuth[this.#currentStage] * Math.PI) / 180;
        controls.maxAzimuthAngle =
          (this.#maxAzimuth[this.#currentStage] * Math.PI) / 180;
        controls.minDistance = this.#minDistance[this.#currentStage];
        controls.maxDistance = this.#maxDistance[this.#currentStage];
        this.buttonContainer.style.display = "flex";
        this.stageCallBack(this.#currentStage);
      },
    });
  }

  nextPage() {
    this.stageCallBack(-1);
    this.buttonContainer.style.display = "none";
    this.#currentStage++;
    this.#goToCurrentStage();

    this.prevButton.style.display = "inline-block";
    if(this.#currentStage+1 >= this.#pageNumber) {
      this.nextButton.style.display = "none";
    }
    else {
      this.nextButton.style.display = "inline-block";
    }
  }

  previousPage() {
    this.stageCallBack(-1);
    this.buttonContainer.style.display = "none";
    this.#currentStage--;
    this.#goToCurrentStage();

    this.nextButton.style.display = "inline-block";

    if(this.#currentStage <= 0) {
      this.prevButton.style.display = "none";
    }
    else {
      this.prevButton.style.display = "inline-block";
    }
  }

  start() {
    this.#lastCameraPos = camera.position.clone();
    this.#lastCameraLookAt = new THREE.Vector3(0, 0, 0);
    this.prevButton.style.display = "none";
    if (this.#pageNumber == 1) {
      this.nextButton.style.display = "none";
    } else {
      this.nextButton.style.display = "inline-block";
      this.prevButton.addEventListener("click", this.prevButtonHandler);
      this.nextButton.addEventListener("click", this.nextButtonHandler);
    }

    this.closeButton.addEventListener("click", this.closeButtonHandler);

    this.#currentStage = 0;
    this.buttonContainer.style.display = "none";
    this.#goToCurrentStage();
  }
}

export { Menu };
