import * as THREE from '../three.js/build/three.module.js';
import { OrbitControls } from "./OrbitControls.js"
import { GLTFLoader } from "./GLTFLoader.js"

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        this._currentModelIndex = 0;
        this._currentModel = [
            ['./data/20220421-rain-coat-newblend-animation-mix2.gltf',''],
            ['./data/ubee-03-smallsize-animation.gltf', ''],
            ['./data/rain-color-animation-map.gltf', './data/toy-animation-restart.gltf']
        ];

        this._currentStartAction = [
            ['armwave',''],
            ['test',''],
            ['nla-land','idle-drone']
        ];

        const renderer = new THREE.WebGLRenderer({ antialias: true,  alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        //scene.background = new THREE.Color(0xffffff);
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

    changeAnimation(animationName) {
        const previousAnimationAction = this._currentAnimationAction;
        this._currentAnimationAction = this._animationsMap[animationName];

        if(previousAnimationAction !== this._currentAnimationAction) {
            previousAnimationAction.fadeOut(0.5);
            this._currentAnimationAction.reset().fadeIn(0.5).play();
        }
    }
    changeAnimation1(animationName) {
        const previousAnimationAction = this._currentAnimationAction1;
        this._currentAnimationAction1 = this._animationsMap1[animationName];

        if(previousAnimationAction !== this._currentAnimationAction1) {
            previousAnimationAction.fadeOut(0.5);
            this._currentAnimationAction1.reset().fadeIn(0.5).play();
        }
    }

    _setupAnimations(gltf) {
        const model = gltf.scene;
        const mixer = new THREE.AnimationMixer(model);
        const gltfAnimations = gltf.animations;
        const domControls = document.querySelector("#controls");
        const animationsMap = {};
        let firstAnimation = '';
        gltfAnimations.forEach(animationClip => {
            const name = animationClip.name;
            console.log(name);
            if ( firstAnimation === '' ) {
                firstAnimation = name;
            }

            const domButton = document.createElement("div");
            domButton.classList.add("button");
            domButton.innerText = name;
            domControls.appendChild(domButton);

            domButton.addEventListener("click", () => {
                const animationName = domButton.innerHTML;
                this.changeAnimation(animationName);
            });
 
            const animationAction = mixer.clipAction(animationClip);
            animationsMap[name] = animationAction;
        });

        this._mixer = mixer;
        this._animationsMap = animationsMap;
        //this._currentAnimationAction =  this._animationsMap[firstAnimation];
        this._currentAnimationAction =  this._animationsMap[this._currentStartAction[this._currentModelIndex][0]];
        this._currentAnimationAction.play();
    }
    _setupAnimations1(gltf) {
        const model = gltf.scene;
        const mixer = new THREE.AnimationMixer(model);
        const gltfAnimations = gltf.animations;
        const domControls = document.querySelector("#controls");
        const animationsMap = {};
        let firstAnimation = '';
        gltfAnimations.forEach(animationClip => {
            const name = animationClip.name;
            console.log(name);
            if ( firstAnimation === '' ) {
                firstAnimation = name;
            }

            const domButton = document.createElement("div");
            domButton.classList.add("button");
            domButton.innerText = name;
            domControls.appendChild(domButton);

            domButton.addEventListener("click", () => {
                const animationName = domButton.innerHTML;
                this.changeAnimation1(animationName);
            });

            const animationAction = mixer.clipAction(animationClip);
            animationsMap[name] = animationAction;
        });

        this._mixer1 = mixer;
        this._animationsMap1 = animationsMap;
        //this._currentAnimationAction =  this._animationsMap[firstAnimation];
        this._currentAnimationAction1 =  this._animationsMap1[this._currentStartAction[this._currentModelIndex][1]];
        this._currentAnimationAction1.play();
    }

    _changeModel(prevIndex, changeIndex) {

        var selectedObject = this._scene.getObjectByName('rain_model');
        this._scene.remove(selectedObject);

        if ( prevIndex == 2 ) {
            var selectedObject1 = this._scene.getObjectByName('rain_toy');
            this._scene.remove(selectedObject1);
        }

        this._currentModelIndex = changeIndex;

        this._setupCamera();
        this._setupModel();
        this._setupControls();

    }

    _setupModelButton() {
        const domControls = document.querySelector("#controls_r");
        domControls.innerHTML = '';

        if ( this._currentModelIndex == 0 ) {
            const domButton = document.createElement("div");
            domButton.classList.add("button");
            domButton.innerText = "ubee";
            domControls.appendChild(domButton);
            domButton.addEventListener("click", () => {
                this._changeModel(this._currentModelIndex, 1);
            });

            const domButton1 = document.createElement("div");
            domButton1.classList.add("button");
            domButton1.innerText = "raintoy";
            domControls.appendChild(domButton1);
            domButton1.addEventListener("click", () => {
                this._changeModel(this._currentModelIndex, 2);
            });

        } else if ( this._currentModelIndex == 1 ) {

            const domButton = document.createElement("div");
            domButton.classList.add("button");
            domButton.innerText = "raincoat";
            domControls.appendChild(domButton);
            domButton.addEventListener("click", () => {
                this._changeModel(this._currentModelIndex, 0);
            });

            const domButton1 = document.createElement("div");
            domButton1.classList.add("button");
            domButton1.innerText = "raintoy";
            domControls.appendChild(domButton1);
            domButton1.addEventListener("click", () => {
                this._changeModel(this._currentModelIndex, 2);
            });
        } else if ( this._currentModelIndex == 2 ) {
            const domButton = document.createElement("div");
            domButton.classList.add("button");
            domButton.innerText = "raincoat";
            domControls.appendChild(domButton);
            domButton.addEventListener("click", () => {
                this._changeModel(this._currentModelIndex, 0);
            });

            const domButton1 = document.createElement("div");
            domButton1.classList.add("button");
            domButton1.innerText = "ubee";
            domControls.appendChild(domButton1);
            domButton1.addEventListener("click", () => {
                this._changeModel(this._currentModelIndex, 1);
            });
        }

    }

    _setupModel() {
        const domControls = document.querySelector("#controls");
        domControls.innerHTML = '';
        //new GLTFLoader().load("./data/20220414-rain-lopoly-drophead-animation.gltf", (gltf) => {
        // new GLTFLoader().load("./data/20220420-rain-coat-newblend-animation-mix2.gltf", (gltf) => {
        new GLTFLoader().load(this._currentModel[this._currentModelIndex][0], (gltf) => {
            console.log(gltf);

            const model = gltf.scene;
            if ( this._currentModelIndex == 0 ) {
                model.position.set(0, -1.9, 1);
            } else if ( this._currentModelIndex == 1 ) {
                model.position.set(0, 0, 1.1);
            } else if ( this._currentModelIndex == 2 ) {
                model.position.set(0, -0.9, 0);
            }
            model.name = 'rain_model';
            this._scene.add(model);
            console.log(this._scene);
            
            this._setupAnimations(gltf);

            this._setupModelButton();
        });

        if ( this._currentModel[this._currentModelIndex][1] !== '' ) {
            console.log('toy exist!!');
            new GLTFLoader().load(this._currentModel[this._currentModelIndex][1], (gltf) => {
                console.log(gltf);
                const model = gltf.scene;
                model.scale.set(0.2, 0.2, 0.2);
                model.rotation.set(0.4, 0.2, 0.1);
                if ( this._currentModelIndex == 2 ) {
                    model.position.set(-0.5, 1, 0);
                } else {
                    model.position.set(0, 0, 0);
                }
                model.name = 'rain_toy';
                this._scene.add(model);

                this._setupAnimations1(gltf);
            });

        } else {
            console.log('toy not found!!');
        }
    }

    _setupCamera() {
        
        let fov = 0;
        let far = 0;
        if ( this._currentModelIndex == 0 ) {
            fov = 48;
            far = 4000;
        } else if ( this._currentModelIndex == 1 ) {
            fov = 10;
            far = 1000;
        } else if ( this._currentModelIndex == 2 ) {
            fov = 65;
            far = 1000;
        }
        const camera = new THREE.PerspectiveCamera(
            fov, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            far
        );
        if ( this._currentModelIndex == 0 ) {
            camera.position.set(0, 0, 10);
        } else if ( this._currentModelIndex == 1 ) {
            camera.position.set(0, 4, 13);
        } else if ( this._currentModelIndex == 2 ) {
            camera.position.set(0, 0, 3);
        }
        //camera.position.z = 1000;
        camera.lookAt(0, 0, 0);
        this._camera = camera;

        //const helper = new THREE.CameraHelper( camera );
        //this._scene.add( helper );

    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1.2;
        
        const ambientLight = new THREE.AmbientLight(color, 0.2);
        //ambientLight.position.set(0, 0, 1);
        this._scene.add(ambientLight);

        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 0, 1);
        this._scene.add(light);
        //this._camera.add(light);

        const helper = new THREE.DirectionalLightHelper( light, 2 );
        this._scene.add( helper );

    }

    update(time) {
        time *= 0.001; // second unit

        if(this._mixer) {
            const deltaTime = time - this._previousTime;
            this._mixer.update(deltaTime);
        }
        if(this._mixer1) {
            const deltaTime = time - this._previousTime;
            this._mixer1.update(deltaTime);
        }

        this._previousTime = time;
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}

window.onload = function () {
    new App();
}