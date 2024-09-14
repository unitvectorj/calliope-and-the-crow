import * as THREE from 'three'

/*
3 basic elements of a scene
scene
camera
renderer

Mesh: a geometry + a material
*/

/* 
to run a local server go to terminal and type:
npm run dev
*/


const vermillion = 0xbb3500
let renderer, scene, camera
let mesh1, mesh2

let breathAngle = 0
init() 
animate()


function init(){
    // Canvas
    const canvas = document.querySelector('#c')

    // Scene
    scene = new THREE.Scene()

    //Object
    //const geometry = new THREE.BoxGeometry(2, 2, 2)
    const sphere1 = new THREE.SphereGeometry(1,48,48)
    const sphere2 = new THREE.SphereGeometry(0.5,48,48)
    
    const material = new THREE.MeshPhongMaterial({
        color: 0xbb3500,
        reflectivity: 0.5,
        opacity: 0.75,
        transparent: true,
        side: THREE.DoubleSide
    })

    /*
    const material = new THREE.MeshBasicMaterial(
        {
        color: 0xbb3500,
        wireframe: true
        }
    )
        */
    //const sqMesh = new THREE.Mesh(geometry,material)
    mesh1 = new THREE.Mesh(sphere1, material)
    //mesh1.position.z = 0
    //mesh2.position.z = -4

    // Add object to Scene
    scene.add(mesh1)
    //scene.add(mesh2)

    // Light
    const light = new THREE.DirectionalLight({
        color: 0xffffff,
        intensity: 3
    })
    light.position.set(-1,2,3)
    
    scene.add(light)
    // Sizes
    const sizes = {
        width: 1000,
        height: 1000
    }

    // Fog
    const near_fog = 2;
    const far_fog = 3;
    const color_fog = 'black';
    scene.fog = new THREE.Fog(color_fog, near_fog, far_fog);
    scene.background = new THREE.Color(color_fog);

    // Camera
    camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
    //camera = new THREE.OrthographicCamera()
    camera.position.z = 3
    // Add camera to scene
    scene.add(camera)

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width,sizes.height)

    update()
}

function update(){
    //mesh.rotation.z += 0.0025
    mesh1.rotation.y -= 0.0015
    breathAngle += 0.009
    let breathed = 1 + 0.25*Math.sin(breathAngle)
    mesh1.scale.x = breathed
    mesh1.scale.y = breathed
    mesh1.scale.z = breathed
    
    
}

function render(){
    renderer.render(scene, camera)
}

function animate(){
    if ( resizeRendererToDisplaySize( renderer ) ) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

    }
    requestAnimationFrame( animate );
    update()
    render()
}

function resizeRendererToDisplaySize( renderer ) {

    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    
    const width = Math.floor( canvas.clientWidth * pixelRatio );
    const height = Math.floor( canvas.clientHeight * pixelRatio );
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {

        renderer.setSize( width, height, false );
        console.log("pixelRatio")
	    console.log(pixelRatio)

    }

    return needResize;

}

