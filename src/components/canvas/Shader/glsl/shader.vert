varying vec2 vUv;
uniform float time;
void main() {
  vec3 newPosition = vec3(position.x + sin(position.y * 3.0 + time)/4.0, position.y, position.z);
  
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;
  vUv = uv;
}