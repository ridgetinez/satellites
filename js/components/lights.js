import { AmbientLight, DirectionalLight } from "../../node_modules/three/build/three.module.js";

export function createLights() {
    const ambientLight = new AmbientLight('white', 0.5);
    const directionalLightFront = new DirectionalLight( 0xffffff, 1, 100);
    directionalLightFront.position.set( 1, 3, 10 );
    const directionalLightBack = new DirectionalLight( 0xffffff, 1, 100);
    directionalLightBack.position.set( -1, -3, -10 );
    return [ambientLight, directionalLightFront, directionalLightBack];
}