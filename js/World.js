import { createCamera } from './components/camera.js';
import { createCircles, createOceanWorld } from './components/landmasses.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';

import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js"

let scene;
let camera;
let renderer;

class World {
  constructor(container) {
    scene = createScene();
    renderer = createRenderer();
    camera = createCamera();
    container.append(renderer.domElement);

    // Setup OrbitalControls, it's here instead of camera
    // as it requires a bit of state (render function, domElement)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.addEventListener('change', this.render);

    const earthRadius = 2 
    scene.add(createOceanWorld(earthRadius));
    createCircles(10,earthRadius).forEach((circle) => scene.add(circle));
    createLights().forEach((light) => scene.add(light));

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

}

export { World };
