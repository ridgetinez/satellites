import { Scene, Color, MeshBasicMaterial } from "../../node_modules/three/build/three.module.js";

export function createScene() {
    const scene = new Scene();
    scene.background = new Color(0x050511);
    return scene;
}