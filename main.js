import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { TrackballControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/TrackballControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5; // Set camera position

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x111111, shininess: 200 });


// STL Loader
const loader = new STLLoader()
loader.load(
    'test.stl',
    function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total ) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143"); // Set background colour
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Add renderer to HTML as a canvas element

// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Update size
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix(); // Apply changes
})


// Lights
const lights = []; // Storage for lights
// const lightHelpers = []; // Storage for light helpers
// Properties for each light
const lightValues = [
    {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
    {colour: 0xBE61CF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0x00FF00, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
    {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
    // Loop 6 times to add each light to lights array
    // using the lightValues array to input properties
    lights[i] = new THREE.PointLight(
      lightValues[i]['colour'], 
      lightValues[i]['intensity'], 
      lightValues[i]['dist']
    );
  
    lights[i].position.set(
      lightValues[i]['x'], 
      lightValues[i]['y'], 
      lightValues[i]['z']
    );
  
    scene.add(lights[i]);
// Add light helpers for each light
    // lightHelpers[i] = new THREE.PointLightHelper(lights[i]);
    // scene.add(lightHelpers[i]);
};


//Trackball Controls for Camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;
// Axes Helper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add( axesHelper ); // X axis = red, Y axis = green, Z axis = blue
// Trigonometry Constants for Orbital Paths 
let theta = 0; // Current angle
// Angle increment on each render
const dTheta = 2 * Math.PI / 100;
// Rendering Function
const rendering = function() {
    // Rerender every time the page refreshes (pause when on another tab)
    requestAnimationFrame(rendering);
// Update trackball controls
    controls.update();
// Constantly rotate box
    scene.rotation.z -= 0.005;
    scene.rotation.x -= 0.01;
//Increment theta, and update sphere coords based off new value        
    theta += dTheta;
// Store trig functions for sphere orbits 
    // MUST BE INSIDE RENDERING FUNCTION OR THETA VALUES ONLY GET SET ONCE
    const trigs = [
        {x: Math.cos(theta*1.05), y: Math.sin(theta*1.05), z: Math.cos(theta*1.05), r: 2},
        {x: Math.cos(theta*0.8), y: Math.sin(theta*0.8), z: Math.sin(theta*0.8), r: 2.25},
        {x: Math.cos(theta*1.25), y: Math.cos(theta*1.25), z: Math.sin(theta*1.25), r: 2.5},
        {x: Math.sin(theta*0.6), y: Math.cos(theta*0.6), z: Math.sin(theta*0), r: 2.75}
    ];
renderer.render(scene, camera);
}

rendering();