import * as THREE from '../build/three.module.js';
//import * as THREE from 'three';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';
import { FontLoader } from '../examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../examples/jsm/geometries/TextGeometry.js';

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
        this._setupControls()

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
            0.3,
            100
        );
        camera.position.x = -15;
        camera.position.z = 15;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    
    }

    _setupModel4() {
        /* BoxGeometry : 박스형   */
        //let geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
        
        /* CircleGeometry : 원 */
        //let geometry = new THREE.CircleGeometry(0.9, 16, 0, Math.PI/2);
        
        /* ConeGeometry : 꼬깔 */
        //let geometry = new THREE.ConeGeometry(0.5, 1.6, 16, 9, true, 0, Math.PI/2);

        /* CylinderGeometry : 원통  */
        //let geometry = new THREE.CylinderGeometry(0.9, 0.9, 1.6, 32, 12, true, 0, Math.PI/2);

        /* SphereGeometry : 구  */
        //let geometry = new THREE.SphereGeometry(0.9, 32, 12, 0, Math.PI/2, 0, Math.PI/2);

        /* RingGeometry : 평면 반지   */
        //let geometry = new THREE.RingGeometry(0.2, 1, 6, 2, 0, Math.PI/2);

        /* PlaneGeometry : 평면 사각형  */
        //let geometry = new THREE.PlaneGeometry(1, 1.4, 1, 1);

        /* TorusGeometry : 3차원 링  */
        //let geometry = new THREE.TorusGeometry(0.9, 0.4, 24, 32, Math.PI/2);

        /* TorusKnotGeometry : 여러 3차원 링 묶음  */
        //let geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 3, 4);

        /* ShapeGeometry : 모양으로 평면 그리기 */
        /* 사각형 
        const shape = new THREE.Shape();
        shape.moveTo(1, 1);
        shape.lineTo(1, -1);
        shape.lineTo(-1, -1);
        shape.lineTo(-1, 1);
        shape.closePath();
        */
        /* 하트 
        const x = -2.5, y = -5;
        const shape = new THREE.Shape();
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        let geometry = new THREE.ShapeGeometry(shape);
        */
        /* TubeGeometry : 커브로 원통 그리기
        class CustomSinCurve extends THREE.Curve {
            constructor(scale) {
                super();
                this.scale = scale;
            }
            getPoint(t) {
                const tx = t * 3 - 1.5;
                const ty = Math.sin(2 * Math.PI * t);
                const tz = 0;
                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }
        }
        const shape = new CustomSinCurve(4);

        let geometry = new THREE.TubeGeometry(shape, 40, 0.8, 8, true);
        */
        /* LatheGeometry : 곡선으로 바가지 그리기
        const points = [];
        for ( let i = 0; i < 10; ++i ) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i  - 5) * 0.8));
        }

        let geometry = new THREE.LatheGeometry(points, 32, 0, Math.PI);
        */

        // 베벨링 부드럽게 처리해주는거 
        /* ExtrudeGeometry : 평면에 깊이를 주고 윗면,아랫면을 비스듬하게 처리해줌  */
        const x = -2.5, y = -5;
        const shape = new THREE.Shape();
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        const settings = {
            steps: 2,
            depth: 4,
            bevelEnabled: true,
            bevelThickness: 1.7,
            bevelSizze: 1.5,
            bevelSegments: 6,
        };

        let geometry = new THREE.ExtrudeGeometry(shape, settings);
        
        let material = new THREE.MeshPhongMaterial({color: 0x515151});
        
        let cube = new THREE.Mesh(geometry, material);

        const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial
        );

        const group = new THREE.Group();
        group.add(cube);
        group.add(line);
        
        this._scene.add(group);
        this._cube = group;
    }
    _setupModel() {
        // ttf 폰트 필요
        const fontLoader = new FontLoader();
        async function loadFont(that) {
            const url = '../examples/fonts/helvetiker_regular.typeface.json';
            const font = await new Promise((resolve, reject) => {
                fontLoader.load(url, resolve, undefined, reject);
            });

            let text = 'danbee.ai';
            const settings = {
                font: font,
                size : 9,
                height: 1.8,
                curveSegments: 32, 
                depth: 5,
                // setting for ExtrudeGeometry
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSizze: 0.1,
                bevelSegments: 2,
            };

            let geometry = new TextGeometry(text, settings);

            let material = new THREE.MeshPhongMaterial({color: 0x515151});
            
            let cube = new THREE.Mesh(geometry, material);
    
            const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
            const line = new THREE.LineSegments(
                new THREE.WireframeGeometry(geometry), lineMaterial
            );
    
            const group = new THREE.Group();
            group.add(cube);
            group.add(line);
            
            that._scene.add(group);
            that._cube = group;

        }
        loadFont(this);
    }

    _setupModel5() {
        /* 평면그리기 
        const shape = new THREE.Shape();
        // 사각형 
        //shape.moveTo(1, 1);
        //shape.lineTo(1, -1);
        //shape.lineTo(-1, -1);
        //shape.lineTo(-1, 1);
        //shape.closePath();
        
        // 하트 
        const x = -2.5, y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        let geometry = new THREE.BufferGeometry();
        const points = shape.getPoints();
        geometry.setFromPoints(points)

        */
        /* 커브 그리기 
        class CustomSinCurve extends THREE.Curve {
            constructor(scale) {
                super();
                this.scale = scale;
            }
            getPoint(t) {
                const tx = t * 3 - 1.5;
                const ty = Math.sin(2 * Math.PI * t);
                const tz = 0;
                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }
        }
        const shape = new CustomSinCurve(4);
 
        let geometry = new THREE.BufferGeometry();
        const points = shape.getPoints(310);
        geometry.setFromPoints(points)
        */

        /* 곡선 그리기
        const points = [];
        for ( let i = 0; i < 10; ++i ) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i  - 5) * 0.8));
        }

        let geometry = new THREE.BufferGeometry();
        geometry.setFromPoints(points)
        */



        const material = new THREE.LineBasicMaterial({color: 0xffff00});
        const line = new THREE.Line(geometry, material)
        
        this._scene.add(line);
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
    }
}

window.onload = function() {
    new App()
}