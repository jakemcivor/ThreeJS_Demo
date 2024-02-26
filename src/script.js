import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI }  from 'lil-gui'

/**
 * GUI
 */
const gui = new GUI()

const parameters = {
    materialColor: '#be1313'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)

    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */


// Texture

// Material
const material = new THREE.MeshPhongMaterial({ 
    color: parameters.materialColor, 
    specular: 0x111111, 
    shininess: 200 });
const materialMesh = new THREE.MeshBasicMaterial({
    color: 'skyblue',
    wireframe: true,
})

// Geometry
const BoxGeometry = new THREE.BoxGeometry()

const cube = new THREE.Mesh(BoxGeometry, materialMesh)
scene.add(cube)

// Meshes
const loader = new STLLoader()
loader.load(
    './test.stl',
    function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.scale.set(0.5,0.5,0.5);
        scene.add(mesh)
        
        // const mesh2 = new THREE.Mesh(geometry, materialMesh)
        // mesh2.scale.set(1,1,1)
        // scene.add(mesh2)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)


// Helpers
scene.add(new THREE.AxesHelper(5))

/**
 * Lights
 */
// const spotLight = new THREE.SpotLight()
// spotLight.position.set(20, 20, 20)
// scene.add(spotLight)

const ambientLight = new THREE.AmbientLight()
ambientLight.position.set(20,20,20,)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 3

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

/**
 * Controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true





window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
/**
 * Stats
 */
// const stats = new Stats()
// document.body.appendChild(stats.dom)


/**
 * Animate
 */
function animate() {
    requestAnimationFrame(animate)

    controls.update()

    cube.rotation.x += 0.01

    render()

   // stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()