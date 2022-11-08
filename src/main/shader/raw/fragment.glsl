precision lowp float;

varying vec2 v_uv;
varying float v_elevation;

void main() {
  float height = v_elevation + 0.05 * 10.0;
  gl_FragColor = vec4( v_uv * height, 0.0, 1.0 );
}