import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

export default () => {
  console.log('l 02')

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 )

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xEEEEEE, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const planeGeometry = new THREE.PlaneGeometry( 60, 40, 1, 1 );
  const planeMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = 0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight)
  const spotLight = new THREE.SpotLight(0xffffff, 1.2, 150, 120);
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight)
  
  // 雾化
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
  scene.fog = new THREE.FogExp2( 0xffffff, 0.015 )

  // 材质覆盖属性
  scene.overrideMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xffffff
   })

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position)

  document.body.appendChild( renderer.domElement )
  renderer.render( scene, camera )
  
  const controls = {
    rotationSpeed: 0.2,
    numberOfObjects: scene.children.length,
    removeCube: () => {
      const allChildren = scene.children
      const lastObject = allChildren[allChildren.length-1]
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject)
        controls.numberOfObjects = scene.children.length
      }
    },
    addCube: () => {
      const cubeSize = Math.ceil(Math.random()*3)
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
      const cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff
      })
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.castShadow = true
      cube.name = `cube-${scene.children.length}`
      cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width)
      cube.position.y = Math.round(Math.random() * 5)
      cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height)
      scene.add(cube)
      controls.numberOfObjects = scene.children.length
    },
    outputObjects: () => {
      console.log(scene.children)
    }
  }

  const gui = new GUI()
  gui.add(controls, 'rotationSpeed', 0, 0.5)
  gui.add(controls, 'addCube')
  gui.add(controls, 'removeCube')
  gui.add(controls, 'outputObjects').listen()


  const stats = new Stats();
  stats.setMode(0);
  document.body.appendChild( stats.dom );
  render()



  function render() {
    stats.update()
    scene.traverse(e => {
      if (e instanceof THREE.Mesh && e != plane) {
        e.rotation.x += controls.rotationSpeed
        e.rotation.y += controls.rotationSpeed
        e.rotation.z += controls.rotationSpeed
      }
    })
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }

}