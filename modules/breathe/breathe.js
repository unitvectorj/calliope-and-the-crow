import * as THREE from 'three'
import GUI from 'lil-gui'
//import * as Synth from '../synth/synth'

import * as Tone from 'tone'

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

let synthPlaying = false

const gui = new GUI()
const vermillion = 0xbb3500
let renderer, scene, camera, canvas
let mesh1, mesh2, light1, light2, light3
let synthesizer
let breathAngle = Math.PI

const chord1 = ['C4','D4','B4'];
const chord2 = ['A3','C4','G4'];

init() 
animate()


function init(){
    // Canvas
    canvas = document.querySelector('#c')
    //Synth.say()
    // Scene
    scene = new THREE.Scene()



    //Object
    const sphere1 = new THREE.SphereGeometry(1,48,48)
    
    const material = new THREE.MeshPhysicalMaterial({
        color: 'white',
        metalness: 0.0,
        roughness: 0.5
    })
    mesh1 = new THREE.Mesh(sphere1, material)



    // Add object to Scene
    scene.add(mesh1)



    // Light
    light1 = new THREE.PointLight({
        intensity: 1
    })
    light1.color.set(0xff7236)
    light1.position.set(-1,1,2)

    light2 = new THREE.PointLight({
        intensity: 1
    })
    light2.color.set(0x7590ff)
    light2.position.set(2,0,1)

    light3 = new THREE.PointLight({
        intensity: 1
    })
    light3.color.set(0x888888)
    light3.position.set(0.15,-2,1)

    scene.add(light1)
    scene.add(light2)
    scene.add(light3)


    // Sizes
    /*
    const sizes = {
        width: 1000,
        height: 1000
    }
    */


    // Fog
    const near_fog = 2;
    const far_fog = 2.75;
    const color_fog = 'black';
    scene.fog = new THREE.Fog(color_fog, near_fog, far_fog);
    scene.background = new THREE.Color(color_fog);



    // Camera
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight)
    camera.position.z = 3



    // Add camera to scene
    scene.add(camera)



    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(window.innerWidth,window.innerHeight)



    // GUI
    gui.addColor(material, 'color')
    gui.add(material, 'metalness',0,1)
    gui.add(material, 'roughness',0,1)
    gui.addColor(light1,'color')
    gui.addColor(light2,'color')
    gui.addColor(light3,'color')
    gui.add(scene.fog, 'near',1,3)
    gui.add(scene.fog, 'far',1,3)
    
    const reverb = new Tone.Reverb({
        decay: 3,
        wet: 0.5

    }).toDestination()
    synthesizer = getSynth()
    synthesizer.connect(reverb);

    update()
}

function update(){
    mesh1.rotation.y -= 0.0015
    breathAngle = (breathAngle + Math.PI/360) % (2 * Math.PI)
    if (!synthPlaying){
        if (breathAngle > 3.2 && breathAngle < 3.5){
            synthPlaying = true
            synthesizer.triggerAttackRelease(chord1,5)
            console.log("triggered attack")
        }
        if(breathAngle < 0.2){
            synthPlaying = true
            synthesizer.triggerAttackRelease(chord2,5)
            console.log("triggered attack")
        }
    }

    if (synthPlaying && ((breathAngle > 3.0 && breathAngle < 3.1) || breathAngle > 6.01)){
        synthPlaying = false
        console.log("Triggered release")
    }

    console.log(synthPlaying)

    const cosValue = Math.cos(breathAngle)
    let breathed = 1 + 0.25*cosValue
    const colCos = 0.025 + 0.025*cosValue
    const bColor = new THREE.Color(colCos*2.55,colCos*0.35,colCos*0)
    scene.background = bColor
    scene.fog.color = bColor
    mesh1.scale.x = breathed
    mesh1.scale.y = breathed
    mesh1.scale.z = breathed
 
    
}

function render(){
    renderer.render(scene, camera)
}

function animate(){
    if ( resizeRendererToDisplaySize( renderer ) ) {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    requestAnimationFrame( animate );
    update()
    render()
}

function resizeRendererToDisplaySize( renderer ) {

    //const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    
    const width = Math.floor( window.innerWidth * pixelRatio );
    const height = Math.floor( window.innerHeight * pixelRatio );
    const needResize = canvas.width !== width || canvas.height !== height;
    //console.log("ClientSizes")
    
    if ( needResize ) {
        renderer.setSize( width, height);
    }

    return needResize;

}

function getSynth(){
    Tone.start()
    
    const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
            volume: -30,
            type: 'sine'
            //partials: [0 ,2, 3, 4]
        },
        envelope: {
            //attackCurve: 'exponential',
            attack: 2.5,
            decay: 0,
            sustain: 0.8,
            release: 2.5
        }
        
    })
    
    return synth
        
}