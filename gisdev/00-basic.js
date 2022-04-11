import * as THREE from '../build/three.module.js'
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';

class App {
    constructor() {
        this.initialize();
        this.render();
    }
    
    initialize() {
        this.domWebGL = document.createElement('div');
        document.body.appendChild(this.domWebGL);
        let scene = new THREE.Scene();
        let renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.domWebGL.appendChild(renderer.domElement);  
        window.onresize = this.resize.bind(this); 
        let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        let cubeMaterial = new THREE.MeshNormalMaterial();
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.x = 0;
        cube.position.y = 0;
        cube.position.z = 0;
        scene.add(cube);
        let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.x = 3;
        camera.position.y = 3;
        camera.position.z = 3;
        camera.lookAt(scene.position);
        scene.add(camera);
        this.camera = camera;
        this.renderer = renderer;
        this.scene = scene;
        this.cube = cube;
    }

    update() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.02;
    }
    render() {
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        let camera = this.camera;
        let renderer = this.renderer;
        let scene = this.scene;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

}

window.onload = function() {
    new App()
}