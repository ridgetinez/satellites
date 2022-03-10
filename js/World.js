import { createCamera } from './components/camera.js';
import { createCircles, createOceanWorld } from './components/landmasses.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';

import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import Stats from "../node_modules/three/examples/jsm/libs/stats.module.js"
// import * as UPNG from '../node_modules/upng-js/UPNG.js';

let scene;
let camera;
let renderer;
let status;

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

    // TODO: handle errors
    fetch("http://localhost:8080/images/worldmap.png")
      .then(response => response.ok ? response.arrayBuffer() : Promise.reject("request failed"))
      .then(pngBuffer => {
        let img = UPNG.decode(pngBuffer);
        console.log(UPNG.toRGBA8(img));
        createCircles(30,earthRadius, new Uint8Array(UPNG.toRGBA8(img)[0])).forEach((circle) => scene.add(circle));
      })
      .catch(e => console.log(e));

    const earthRadius = 2
    scene.add(createOceanWorld(earthRadius));
    createLights().forEach((light) => scene.add(light));

    // add FPS counter
    status = Stats();
    document.body.appendChild(status.dom);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
    status.update();
  }

}

export { World };
