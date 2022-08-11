import './style.css'
import globeMap from './globe.jpg';
import pngEarth from './pngeart.png';
import earth from './eart.jpg';
// import * as THREE from 'three';
// import OrbitControls from 'three-orbit-controls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.getElementById('app').appendChild(renderer.domElement);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(pngEarth),
  color:0x0C2E4E
}));


scene.add(sphere)
camera.position.z = 11
let controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = false

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.0015;
  sphere.rotation.x += 0.0008;
  controls.update();
  renderer.render(scene, camera);
};

animate();

