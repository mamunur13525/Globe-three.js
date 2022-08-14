
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
var n = 0; // index
var a = 0; // angle
var c = 4; // gap

var group = 50000;
var angle = 137.50755; // sunflower phyllotaxis
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  strokeWeight(.2);
}

function draw() {
  for (var i=0;i<group;i++) {
    n++;
    addDot(n);
  }
}

function addDot(n) {
  a = n * angle;
  r = c * sqrt(n) + n / 50;
  angleMode(DEGREES);
  var x = r * Math.cos(a) + width / 2;
  var y = r * Math.sin(a) + height / 2;
  fill(50);
  noStroke();
  ellipse(x, y, 4, 5);
  stroke('red');

}