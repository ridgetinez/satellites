import { AmbientLight, DirectionalLight } from "../../node_modules/three/build/three.module.js";

export function createLights() {
    const ambientLight = new AmbientLight('white', 0.5);
    const directionalLightA = new DirectionalLight( 0xffffff, 1, 100);
    directionalLightA.position.set( -5, 3, 10 );
    const directionalLightB = new DirectionalLight( 0xffffff, 1, 100);
    directionalLightB.position.set( -10, 0, 0 );
    const directionalLightC = new DirectionalLight( 0xffffff, 1, 100);
    directionalLightC.position.set( -5, -3, 10 );
    // const directionalLightBack = new DirectionalLight( 0xffffff, 1, 100);
    // directionalLightBack.position.set( -1, -3, -10 );
    return [ambientLight, directionalLightA, directionalLightB, directionalLightC];
    // return [directionalLightFront, directionalLightBack];
}