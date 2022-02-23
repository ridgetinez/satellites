import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 10, 10);
controls.update();

const lightAmbient = new THREE.AmbientLight('white', 0.5); // soft white light
scene.add( lightAmbient );

const light = new THREE.DirectionalLight( 0xffffff, 1, 100);
light.position.set( 1, 3, 10 );
scene.add( light );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const geometry = new THREE.SphereGeometry(3,64);

const material = new THREE.MeshPhongMaterial( {color: 0xeabdef} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

function animate() {
	requestAnimationFrame( animate );
	// required if controls.enableDamping or controls.autoRotate are set to true
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;

    // light.rotation.x += 0.01;
	controls.update();
	renderer.render( scene, camera );
}

animate();