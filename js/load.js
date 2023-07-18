import * as THREE from "three";

const loadingManager = new THREE.LoadingManager();

let currentProgressPercent = 0;
const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.querySelector(".progress-bar-container");

loadingManager.onStart = function(url, item, total) {
    console.log(`onStart: url: ${url} item:${item} total:${total}`);
}

loadingManager.onProgress = function(url, loaded, total) {
    const ProgressPercent = loaded * 100 / total;
    currentProgressPercent = currentProgressPercent > ProgressPercent ? currentProgressPercent : ProgressPercent;
    progressBar.value = currentProgressPercent;
}

loadingManager.onLoad = function() {
    progressBarContainer.style.display = "none";
}

loadingManager.onError = function(url) {
    console.log(`onError: url:${url}`);
}

export { loadingManager };