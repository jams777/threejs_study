# DOC 

## Manual 

### Visual Studio Code 에서 실행해보기

추천 [Five Server](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) for Visual Studio Code

추천 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for Visual Studio Code

추천 [Servez](https://greggman.github.io/servez/) 활용

Node.js (five-server, http-server), Python, Ruby, Lighttpd, IIS 등을 활용해서 로컬컴퓨터에서 실행할 수 있다.

자세한 내용은 해당 문서를 참고한다.

en : (How to run things locally)[https://threejs.org/docs/index.html#manual/en/introduction/How-to-run-things-locally]

ko : (로컬 환경에서 구동 방법)[https://threejs.org/docs/index.html#manual/ko/introduction/How-to-run-things-locally]


### 장면 만들기(Creating a scene)

en : (Creating a scene)[https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene]

ko : (Creating a scene)[https://threejs.org/docs/index.html#manual/ko/introduction/Creating-a-scene]


### 설치(Installation)

en : (Creating a scene)[https://threejs.org/docs/index.html#manual/en/introduction/Installation]

ko : (Creating a scene)[https://threejs.org/docs/index.html#manual/ko/introduction/Installation]

#### npm으로 설치하기

``` 
npm install --save three
``` 

아래처럼 불러옴

```
// Option 1: Import the entire three.js core library.
import * as THREE from 'three';
// Option 2: Import just the parts you need.
import { Scene } from 'three'
```

#### static hosting 및 CDN을 통한 설치

type="module" 을 사용하여 사용

examples/jsm 폴더의 라이브러리를 사용하면 됨

```
<script type="module">

  // 사이트에 방문하여 버전을 찾을 수 있음 https://cdn.skypack.dev/three.

  import * as THREE from 'https://cdn.skypack.dev/three@<version>';

  const scene = new THREE.Scene();

</script>
```

예제

```
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = new OrbitControls( camera, renderer.domElement );
```


#### WebGL 호환성 검사(WebGL compatibility check)

en : (WebGL compatibility check)[https://threejs.org/docs/index.html#manual/en/introduction/WebGL-compatibility-check]

ko : (WebGL 호환성 검사)[https://threejs.org/docs/index.html#manual/ko/introduction/WebGL-compatibility-check]


#### 로컬 환경에서 구동 방법(How to run things locally)

위에 Visual Studio Code 에서 실행해보기 로 진행함.

en : (How to run things locally)[https://threejs.org/docs/index.html#manual/en/introduction/How-to-run-things-locally]

ko : (로컬 환경에서 구동 방법)[https://threejs.org/docs/index.html#manual/ko/introduction/How-to-run-things-locally]

