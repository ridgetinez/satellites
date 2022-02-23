import { AmbientLight, DirectionalLight } from "../../node_modules/three/build/three.module.js";

export function createLights() {
    const ambientLight = new AmbientLight('white', 0.5);
    const directionalLight = new DirectionalLight( 0xffffff, 1, 100);
    directionalLight.position.set( 1, 3, 10 );
    return [ambientLight, directionalLight];
}