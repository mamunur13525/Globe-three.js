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
// Create 60000 tiny dots and spiral them around the sphere.
const DOT_COUNT = 60000;

// A hexagon with a radius of 2 pixels looks like a circle
const dotGeometry = new THREE.CircleGeometry(2, 5);

// The XYZ coordinate of each dot
const positions = [];

// A random identifier for each dot
const rndId = [];

// The country border each dot falls within
const countryIds = [];

const vector = new THREE.Vector3();

for (let i = DOT_COUNT; i >= 0; i--) {
  const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
  const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

  // Pass the angle between this dot an the Y-axis (phi)
  // Pass this dot’s angle around the y axis (theta)
  // Scale each position by 600 (the radius of the globe)
  vector.setFromSphericalCoords(600, phi, theta);
  dotGeometry.lookAt(vector);

  // Move the dot to the newly calculated position
  dotGeometry.translate(vector.x, vector.y, vector.z);

}

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

