import * as THREE from 'three' 

export default function() {
  let meshArray = []
  for ( let i = 0; i < 50; i++ ) {
    const geometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(9)
    for ( let j = 0; j < 9; j++ ) {
      positionArray[j] = Math.random() * 10 - 5
    }
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positionArray, 3 ) )
    const material = new THREE.MeshBasicMaterial({ 
      color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      transparent: true,
      opacity: 0.5,
    })
    const mesh = new THREE.Mesh( geometry, material )
    meshArray.push(mesh)
  }
  return meshArray
  // const vertices = new Float32Array([
  //   -1.0, -1.0,  1.0, 
  //    1.0, -1.0,  1.0,
  //    1.0,  1.0,  1.0,

  //    1.0,  1.0,  1.0,
  //   -1.0,  1.0,  1.0,
  //   -1.0, -1.0,  1.0
  // ])
}