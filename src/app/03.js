import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils.js';

export default () => {
  console.log('l 03')
  const stats = new Stats();
  stats.setMode(0);
  document.body.appendChild( stats.dom );

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 )
  camera.position.x = -20;
  camera.position.y = 25;
  camera.position.z = 20;
  camera.lookAt(new THREE.Vector3(5, 0, 0));

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const planeGeometry = new THREE.PlaneGeometry( 60, 40, 1, 1 );
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  const ambientLight = new THREE.AmbientLight(0x3c3c3c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI/4);
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.position.set(-40, 30, 30);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const vertices = [
    new THREE.Vector3(1,3,1),
    new THREE.Vector3(1,3,-1),
    new THREE.Vector3(1,-1,1),
    new THREE.Vector3(1,-1,-1),
    new THREE.Vector3(-1,3,-1),
    new THREE.Vector3(-1,3,1),
    new THREE.Vector3(-1,-1,-1),
    new THREE.Vector3(-1,-1,1),
  ]
  const faces = [
    // new THREE.Face3(0,2,1),
    // new THREE.Face3(2,3,1),
    // new THREE.Face3(4,6,5),
    // new THREE.Face3(6,7,5),
    // new THREE.Face3(4,5,1),
    // new THREE.Face3(5,0,1),
    // new THREE.Face3(7,6,2),
    // new THREE.Face3(6,3,2),
    // new THREE.Face3(5,7,0),
    // new THREE.Face3(7,2,0),
    // new THREE.Face3(1,3,4),
    // new THREE.Face3(3,6,4),
    
    vertices[0], vertices[2], vertices[1],
    vertices[2], vertices[3], vertices[1],
    vertices[4], vertices[6], vertices[5],
    vertices[6], vertices[7], vertices[5],
    vertices[4], vertices[5], vertices[1],
    vertices[5], vertices[0], vertices[1],

    vertices[7], vertices[6], vertices[2],
    vertices[6], vertices[3], vertices[2],
    vertices[5], vertices[7], vertices[0],
    vertices[7], vertices[2], vertices[0],
    vertices[1], vertices[3], vertices[4],
    vertices[3], vertices[6], vertices[6],
  ]

  const geometry = new THREE.BufferGeometry()
  geometry.setFromPoints(faces)
  geometry.computeVertexNormals()

  const materials = [
    new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true}),
    new THREE.MeshLambertMaterial({opacity: 0.6, color: 0x44ff44, transparent: true})
  ]
  const mesh = createMultiMaterialObject(geometry, materials);
  mesh.castShadow = true;
  mesh.children.forEach(function (e) {
    e.castShadow = true
  });

  scene.add(mesh);

  const wireframe = new THREE.WireframeGeometry(geometry)
  const line = new THREE.LineSegments(wireframe)
  line.material.linewidth = 2
  scene.add(line)

  document.body.appendChild( renderer.domElement )

  render();

  function render() {
 
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}