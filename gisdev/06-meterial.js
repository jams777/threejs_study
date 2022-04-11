import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';

class App {
    constructor() {

        const divContainer = document.querySelector('#webgl-container');
        this._divContainer = divContainer;

        // antialias: true : object 경계선이 부드럽겐
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        // 윈도우 화면의 배율 지정
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));

    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 7;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    
    }

    _setupModel() {
        
        const textureLoader = new THREE.TextureLoader();
        const map = textureLoader.load('../examples/textures/uv_grid_opengl.jpg', 
        texture=>{
            texture.repeat.x = 1;
            texture.repeat.y = 1;

            texture.wrapS = THREE.ClampToEdgeWrapping;  // MirroredRepeatWrapping
            texture.wrapT = THREE.ClampToEdgeWrapping;

            texture.offset.x = 0; // 0.5, -0.5
            texture.offset.y = 0;

            texture.rotation = THREE.MathUtils.degToRad(45);   // 45
            texture.center.x = 0.5;
            texture.center.y = 0.5;

            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.NearestFilter;
            //texture.minFilter = THREE.LinearFilter;
            //texture.minFilter = THREE.NearestMipMapNearestFilter;
            //texture.minFilter = THREE.LinearMipMapNearestFilter;
            //texture.minFilter = THREE.NearestMipMapLinearFilter;
            //texture.minFilter = THREE.LinearMipmapLinearFilter;
        });

        let material = new THREE.MeshStandardMaterial({
            visible: true,
            transparent: false,
            opacity: 1,
            depthTest: false,
            depthWrite: false,
            side: THREE.FrontSide,  // FrontSide  BackSide DoubleSide
            
            map: map,
            //color: 0xff0000,
            emissive: 0x000000,  // 0x000000 재질자체에서 발생색상 - 광원 영향 안받음
            roughness: 0.25,   // 거칠기  
            metalness: 0.2,    // 금속성   0 - 1 
            flatShading: false,
            wireframe: false,
        });

        let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        box.position.set(-1, 0, 0);
        this._scene.add(box);

        let sphere = new THREE.Mesh( new THREE.SphereGeometry(0.7, 32, 12), material);
        sphere.position.set(1, 0, 0);
        this._scene.add(sphere); 

    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        time *= 0.001 // to sec
        //this._cube.rotation.x = time;
        //this._cube.rotation.y = time;
    }
}

window.onload = function() {
    new App()
}