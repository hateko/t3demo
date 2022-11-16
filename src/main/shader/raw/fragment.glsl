precision lowp float;

varying vec2 v_uv;
varying float v_elevation;

uniform sampler2D u_texture;

void main() {
  float height = v_elevation + 0.05 * 10.0;
  // gl_FragColor = vec4( v_uv * height, 0.0, 1.0 );

  // 根据uv取对应颜色
  
  vec4 textureColor = texture2D( u_texture, v_uv );
  textureColor.rgb *= height;
  gl_FragColor = textureColor;
}