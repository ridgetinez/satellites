import { World } from './World.js';

function main() {
  // Get a reference to the container element
  const container = document.getElementById('scene-container');

  // create a new world
  const world = new World(container);

  // draw the scene
  world.render();
}

main();
