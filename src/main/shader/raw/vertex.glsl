// precision lowp float;

// 特点信息，传参
attribute vec3 position;
attribute vec2 uv;

// 通用变量
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// 传给片元着色器使用变量
varying vec2 v_uv;

// highp -2^16 ~ 2^16
// mediump -2^10 ~ 2^10
// lowp -2^8 ~ 2^8

varying float v_elevation;

void main() {
  v_uv = uv;
  vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
  modelPosition.x += 1.0;
  modelPosition.z = sin(modelPosition.x * 10.0);

  v_elevation = modelPosition.z;
  
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
