import * as THREE from '../three.js/build/three.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';

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

    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 30;
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
        const solarSystem = new THREE.Object3D();
        this._scene.add(solarSystem);
        
        // 태양
        const radius = 1;
        const widthSegments = 12;
        const heightSegments = 12;
        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        
        const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xffff00, flatShading: true});
        
        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(3, 3, 3);
        solarSystem.add(sunMesh);

        const earthOrbit = new THREE.Object3D();
        earthOrbit.position.x = 10;
        solarSystem.add(earthOrbit);

        const earthMaterial = new THREE.MeshPhongMaterial({
            color: 0x2233ff, emissive: 0x112244, flatShading: true});
        const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
        earthOrbit.add(earthMesh);

        const moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 2;
        earthOrbit.add(moonOrbit);

        const moonMaterial = new THREE.MeshPhongMaterial({
            color: 0x888888, emissive: 0x222222, flatShading: true});

        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        //moonMesh.position.x = 0;
        moonMesh.scale.set(0.5, 0.5, 0.5);
        moonOrbit.add(moonMesh);

        this._solarSystem = solarSystem;
        this._earthOrbit = earthOrbit;
        this._moonOrbit = moonOrbit;

    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
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
        this._solarSystem.rotation.y = time / 2;
        this._earthOrbit.rotation.y = time * 2;
        this._moonOrbit.rotation.y = time * 5;
    }
}

window.onload = function() {
    new App()
}