import * as THREE from 'three'

import basicVertexShader from './shader/basic/vertex.glsl'
import basicFragmentShader from './shader/basic/fragment.glsl'
import rawVertexShader from './shader/raw/vertex.glsl'
import rawFragmentShader from './shader/raw/fragment.glsl'


export default () => {
  /**
   * 本地坐标系 -> 模型矩阵 -> 世界坐标系 -> 视图矩阵 -> 视图坐标系 -> 投影矩阵 -> 裁剪坐标系
   * gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
   * gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
   */
  const shaderMaterial = new THREE.ShaderMaterial({      
    vertexShader: basicVertexShader, //顶点
    fragmentShader: basicFragmentShader, // 片元
  })

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('../../dist/door.jpg')
 
  const rawShaderMaterial = new THREE.RawShaderMaterial({      
    vertexShader: rawVertexShader, //顶点
    fragmentShader: rawFragmentShader, // 片元
    wireframe: true,
    side: THREE.DoubleSide,
    uniforms: {
      u_time: { value: 0 },
      u_texture: { value: texture },
    }
  })
  const geometry = new THREE.PlaneBufferGeometry( 1, 1, 64, 64 )
  const plane = new THREE.Mesh(
    geometry,
    rawShaderMaterial
  ) 

  return {
    plane,
    rawShaderMaterial
  }
}

