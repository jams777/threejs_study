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
        /* 점 타입 그리기 
        const vertices = [];
        for(let i = 0; i < 10000; i++ ) {
            const x = THREE.Math.randFloatSpread(5);
            const y = THREE.Math.randFloatSpread(5);
            const z = THREE.Math.randFloatSpread(5);

            vertices.push(x, y, z);

        }
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

        const sprite = new THREE.TextureLoader().load('../../../three.js/examples/textures/sprites/disc.png');

        let material = new THREE.PointsMaterial({
            map: sprite,
            alphaTest: 0.5,
            color: 0xff0000,
            size: 5,
            sizeAttenuation: false
        });
        
        let points = new THREE.Points(geometry, material);

        this._scene.add(points);
        */
       /* 선 타입 그리기 */
        const vertices = [
            -1, 1, 0,
            1, 1, 0,
            -1, -1, 0,
            1, -1, 0,
        ];
        
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

        let material = new THREE.LineBasicMaterial({
            color: 0xffff00,
        });
        // 점선으로 바꿔서 그릴때
        material = new THREE.LineDashedMaterial({
            color: 0xffff00,
            dashSize: 0.2,
            gapSize: 0.1,
            scale: 1
        });
        
        //let line = new THREE.Line(geometry, material);
        //let line = new THREE.LineSegments(geometry, material);
        let line = new THREE.LineLoop(geometry, material);
        // 점선일때 처리할 내용
        line.computeLineDistances();

        this._scene.add(line);
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