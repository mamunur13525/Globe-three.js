// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(2, 200, 200);
var material = new THREE.MeshBasicMaterial({ color: 0x112448 });
var globe = new THREE.Mesh(geometry, material);
scene.add(globe);

const controls = new OrbitControls(camera, renderer.domElement)

scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
scene.background = new THREE.Color(0x0C2E4E);

camera.position.z = 10;

var vertexShader = [
  'varying vec3 vNormal;',
  'void main() {',
  'vNormal = normalize( normalMatrix * normal );',
  'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
  '}'
].join('\n')

var fragmentShader = [
  'varying vec3 vNormal;',
  'void main() {',
  'float intensity = pow( 0.9 - dot( vNormal, vec3( 0, 0, 1 ) ), 12.0 );',
  'gl_FragColor = vec4( 1, 1.0, 1.0, .09 ) * intensity;',
  '}'
].join('\n')

var uniforms = THREE.UniformsUtils.clone({});
var material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true
});

var mesh = new THREE.Mesh(geometry, material);
mesh.scale.set(1.09, 1.09, 1.09);
scene.add(mesh);

// console.log(vertexShader)

// Add camera controls


var render = function () {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();

// renderer.render(scene, camera);
console.log('Done')
