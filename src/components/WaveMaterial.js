import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import guid from 'short-uuid'
// @ts-ignore
import vertex from './canvas/Shader/glsl/shader.vert'
import fragment from './canvas/Shader/glsl/shader.frag'

// This shader is from Bruno Simons Threejs-Journey: https://threejs-journey.xyz
class WaveMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        colorStart: { value: new THREE.Color('blue') },
        colorMid: { value: new THREE.Color('green') },
        colorEnd: { value: new THREE.Color('pink') }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    })
  }

  set time(v) { this.uniforms.time.value = v } // prettier-ignore
  get time() { return this.uniforms.time.value } // prettier-ignore
  get colorStart() { return this.uniforms.colorStart.value } // prettier-ignore
  get colorMid() { return this.uniforms.colorMid.value } // prettier-ignore
  get colorEnd() { return this.uniforms.colorEnd.value } // prettier-ignore
}

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
WaveMaterial.key = guid.generate()
// Make the material available in JSX as <waveMaterial />
extend({ WaveMaterial })

export { WaveMaterial }
