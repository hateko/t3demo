import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

export default () => {
  console.log('l 01')
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color('black')

  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(0xEEEEEE, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true

  const axes = new THREE.AxesHelper(20);
  scene.add(axes);

  /**
   * 添加材质、灯光和阴影
   */
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight)



  /**
   * width — 平面沿着X轴的宽度。默认值是1。
   * height — 平面沿着Y轴的高度。默认值是1。
   * widthSegments — （可选）平面的宽度分段数，默认值是1。
   * heightSegments — （可选）平面的高度分段数，默认值是1。
   */
  const planeGeometry = new THREE.PlaneGeometry( 60, 20, 1, 1 );
  const planeMaterial = new THREE.MeshLambertMaterial( {
    color: 0xcccccc,
    side: THREE.DoubleSide,
  } );
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = 0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  scene.add(plane)

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
  const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    // wireframe: true, // 将几何体渲染为线框。默认值为false（即渲染为平面多边形）
  })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  cube.castShadow =true;
  scene.add(cube);

  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial( {
    color: 0x7777ff,
    // wireframe: true,
  } )
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  sphere.castShadow = true;
  scene.add(sphere);

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position)

  document.body.appendChild( renderer.domElement )
  // renderer.render(scene, camera)

  // 帧频辅助器
  const stats = new Stats();
  stats.setMode(0);
  document.body.appendChild( stats.dom );

  // GUI
  const controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03,
  }
  const gui = new GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5)
  gui.add(controls, 'bouncingSpeed', 0, 0.5)

  let step = 0;

  function render() {

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10*Math.abs(Math.sin(step)));


    requestAnimationFrame(render);
    stats.update();
    renderer.render(scene, camera)
    // stats.end();
  }

  render()

}