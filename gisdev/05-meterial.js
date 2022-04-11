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
        camera.position.z = 5;
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
        /* MeshBasicMaterial 물체 타입 그리기 광원 영향 안받음 
        let material = new THREE.MeshBasicMaterial({
            visible: true,
            transparent: true,
            opacity: 0.2,
            depthTest: true,
            depthWrite: true,
            side: THREE.FrontSide,
            
            color: 0xffffff,
            wireframe: false,
        });
        */
        /* MeshLambertMaterial 물체 타입 그리기 정점에서 광원 받음 
        let material = new THREE.MeshLambertMaterial({
            visible: true,
            transparent: true,
            opacity: 0.5,
            depthTest: true,
            depthWrite: true,
            side: THREE.DoubleSide,  // FrontSide  BackSide DoubleSide
            
            color: 0xffffff,
            emissive: 0x555500,  // 0x000000
            wireframe: false,
        });
        */
        /* MeshPhongMaterial 물체 타입 그리기 픽셀단위로 광원 계산 받음 
        let material = new THREE.MeshPhongMaterial({
            visible: true,
            transparent: true,
            opacity: 0.5,
            depthTest: true,
            depthWrite: true,
            side: THREE.FrontSide,  // FrontSide  BackSide DoubleSide
            
            color: 0xff0000,
            emissive: 0x000000,  // 0x000000 재질자체에서 발생색상 - 광원 영향 안받음
            specular: 0xffff00,  // 반사되는 광원의 색깔 
            shininess: 10,
            flatShading: true,
            wireframe: false,
        });
        */
        /* MeshStandardMaterial 물체 타입 그리기 느리지만 품질 좋음 광원 계산 받음  
        let material = new THREE.MeshStandardMaterial({
            visible: true,
            transparent: true,
            opacity: 0.5,
            depthTest: true,
            depthWrite: true,
            side: THREE.FrontSide,  // FrontSide  BackSide DoubleSide
            
            color: 0xff0000,
            emissive: 0x000000,  // 0x000000 재질자체에서 발생색상 - 광원 영향 안받음
            roughness: 0.25,   // 거칠기  
            metalness: 0.2,    // 금속성   0 - 1 
            flatShading: false,
            wireframe: false,
        });
        */
        /* MeshPhysicalMaterial 물체 타입 그리기 느리지만 품질 좋음 코팅효과, 유리같은 효과  */
        let material = new THREE.MeshPhysicalMaterial({
            visible: true,
            transparent: true,
            opacity: 0.5,
            depthTest: true,
            depthWrite: true,
            side: THREE.FrontSide,  // FrontSide  BackSide DoubleSide
            
            color: 0xff0000,
            emissive: 0x000000,  // 0x000000 재질자체에서 발생색상 - 광원 영향 안받음
            roughness: 1,   // 거칠기  
            metalness: 0,    // 금속성   0 - 1 
            clearcoat: 1,    // 코팅
            clearcoatRoughness: 0,  // 코팅거칠기
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