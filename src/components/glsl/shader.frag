#pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
uniform float time;
uniform vec3 colorStart;
uniform vec3 colorMid;
uniform vec3 colorEnd;
varying vec2 vUv;
void main() {
  vec2 displacedUv = vUv + cnoise3(vec3(vUv * 10.0, time * 0.4));
  float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.5));
  float outerGlow = (distance(vUv, vec2(0.5, .75)) * 2.0 - 0.5);
  // strength += outerGlow;
  strength += step(-0.10, strength) * .7;
  strength = clamp(strength, 0.0, 1.0);
  vec3 color = mix(colorStart, colorEnd, strength);
  color = mix(colorMid, color, pow(abs(strength - .5) * 2.0, 4.0));
  gl_FragColor = vec4(color, 1.0);
}