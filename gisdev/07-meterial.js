import * as THREE from '../../../three.js/build/three.module.js';
import { OrbitControls } from '../../../three.js/examples/jsm/controls/OrbitControls.js';
import { VertexNormalsHelper } from '../../../three.js/examples/jsm/helpers/VertexNormalsHelper.js'

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
        camera.position.z = 3;
        this._camera = camera;
        this._scene.add(camera);
    }

    _setupLight() {
        // aoMap 을 위해 : 균일하게 광원 먹이기
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this._scene.add(ambientLight);

        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        //this._scene.add(light);
        this._camera.add(light);
    }

    _setupModel() {
        // 3d textures : https://3dtextures.me/  glass window 002 / Material_1588.jpg
        const textureLoader = new THREE.TextureLoader();
        const map = textureLoader.load('3dtextures/glass/Glass_Window_002_basecolor.jpg', texture=>{});
        const mapAO = textureLoader.load('3dtextures/glass/Glass_Window_002_ambientOcclusion.jpg', texture=>{});
        const mapHeight = textureLoader.load('3dtextures/glass/Glass_Window_002_height.png', texture=>{});
        const mapNormal = textureLoader.load('3dtextures/glass/Glass_Window_002_normal.jpg', texture=>{});
        const mapRoughness = textureLoader.load('3dtextures/glass/Glass_Window_002_roughness.jpg', texture=>{});
        const mapMetalic = textureLoader.load('3dtextures/glass/Glass_Window_002_metallic.jpg', texture=>{});
        const mapAlpha = textureLoader.load('3dtextures/glass/Glass_Window_002_opacity.jpg', texture=>{});

        // 안에서 빛이나오는 그림
        const mapLighit = textureLoader.load('3dtextures/glass/light.jpg', texture=>{});
        const mapLighit1 = textureLoader.load('3dtextures/glass/light1.jpg', texture=>{});
        const mapLighit2 = textureLoader.load('3dtextures/glass/light2.jpg', texture=>{});


        let material = new THREE.MeshStandardMaterial({
            map: map,
            normalMap: mapNormal,

            displacementMap: mapHeight,
            displacementScale: 0.2,
            displacementBias: -0.15, 

            aoMap: mapAO,   // 광원효과를 위해 lihght ambientlight add
            aoMapIntensity: 1, // 효과정도  // 세밀한 그림자를 줄수 있음

            roughnessMap: mapRoughness,   // 거칠기 
            roughness: 0.5,

            metalnessMap: mapMetalic,   // 금속성
            metalness: 0.5,

            //alphaMap: mapAlpha,    // 투명성  light 할때는 하지 않기 
            transparent: true,
            side: THREE.DoubleSide,

            lightMap: mapLighit1,
            lightMapIntensity: 1,
        });

        //let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        // displacementMap
        let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 32, 32, 32), material);
        box.position.set(-1, 0, 0);
        box.geometry.attributes.uv2 = box.geometry.attributes.uv;
        this._scene.add(box);

        //const boxHelper = new VertexNormalsHelper(box, 0.1, 0xffff00);
        //this._scene.add(boxHelper);
        let sphere = new THREE.Mesh( new THREE.SphereGeometry(0.7, 32, 12), material);
        // displacementMap
        //let sphere = new THREE.Mesh( new THREE.SphereGeometry(0.7, 512, 12), material);
        sphere.position.set(1, 0, 0);
        sphere.geometry.attributes.uv2 = sphere.geometry.attributes.uv;
        this._scene.add(sphere); 

        //const sphereHelper = new VertexNormalsHelper(sphere, 0.1, 0xffff00);
        //this._scene.add(sphereHelper);

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