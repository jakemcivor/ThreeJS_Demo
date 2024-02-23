import * as THREE from 'three';
//import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.SpotLight()
light.position.set(20, 20, 20)
scene.add(light)

const my_material = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x111111, shininess: 200 });


// STL Loader
const my_loader = new STLLoader()

my_loader.load(
    'test.stl',
    function (geometry) {
        const mesh = new THREE.Mesh(geometry, my_material)
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
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x111111, shininess: 200 });

const loader = new STLLoader()
loader.load(
    'test.stl',
    function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()