import { PerspectiveCamera } from "../../node_modules/three/build/three.module.js";

export function createCamera(domElement) {
    let [ fov, aspectRatio, near, far ] =  [45, window.innerWidth / window.innherHeight, 1, 1000];
    const camera = new PerspectiveCamera(fov, aspectRatio, near, far);
    camera.position.set( 0, 0, 10 );
    return camera
}