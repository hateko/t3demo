import * as THREE from 'three' 

export default function() {
  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array([
    -1.0, -1.0,  1.0, 
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,

     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0
  ])
  geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) )
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
  const mesh = new THREE.Mesh( geometry, material )

  return mesh
}