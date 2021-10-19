import { useRef, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Perlin } from 'three-noise'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { BlendFunction } from 'postprocessing'
import { SSAO, EffectComposer, Bloom } from '@react-three/postprocessing'

function InstancedPerlin() {
  const {
    xCount,
    yCount,
    spacing,
    shapeSize,
    perlinSpeed,
    perlinScale,
    shape,
  } = useControls('perlin shapes', {
    xCount: 100,
    yCount: 100,
    spacing: 0.4,
    shapeSize: 0.25,
    perlinSpeed: 0.5,
    perlinScale: 0.5,
    shape: { value: 'cube', options: ['cube', 'sphere', "ico"] },
  })

  const { mouseRadius, mouseStrength, mouseLerp } = useControls(
    'mouse effects',
    {
      mouseRadius: 1,
      mouseStrength: 1,
      mouseLerp: 0.1,
    }
  )

  const { roughness, metalness } = useControls(
    'material',
    {
      roughness: 0,
      metalness: .1
    }
  )
  // Instantiate the class with a seed
  const [perlin] = useState([
    new Perlin(Math.random()),
    new Perlin(Math.random()),
  ])

  let screenSpaceCoords = []
  let screenSpaceCache = []
  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {
      let xC = (x - xCount / 2) * spacing + ((y % 2) * spacing) / 2
      let yC = (y - yCount / 2) * spacing
      screenSpaceCoords.push(new THREE.Vector3(xC, yC, 0))
      screenSpaceCache.push(new THREE.Vector3(xC, yC, 0))
    }
  }

  const instancedRef = useRef()
  let temp = new THREE.Object3D()

  const { viewport } = useThree()
  useFrame(({ clock, mouse }) => {
    // let s = document.documentElement.scrollTop / (document.body.scrollHeight - window.innerHeight);
    // if (isNaN(s)) s = 1;
    // console.log(s, Date.now());

    for (let i = 0; i < screenSpaceCoords.length; i++) {
      let perlinPos = new THREE.Vector3(
        screenSpaceCoords[i].x / perlinScale,
        screenSpaceCoords[i].y / perlinScale,
        screenSpaceCoords[i].z + clock.getElapsedTime() * perlinSpeed
        // screenSpaceCoords[i].z + s * perlinSpeed
      )
      temp.position.x =
        screenSpaceCoords[i].x +
        perlin[0].get3(perlinPos.clone()) * 0.3 -
        0.3 / 2
      temp.position.y =
        screenSpaceCoords[i].y +
        perlin[1].get3(perlinPos.clone()) * 0.3 -
        0.3 / 2
      temp.position.z = 0
      temp.rotation.x =
        (perlin[1].get3(perlinPos.clone()) * Math.PI * 3 - Math.PI * 3 / 2) * mouseLerp/10
        + temp.rotation.x * (1 - mouseLerp/10);
      temp.rotation.y =
        (perlin[1].get3(perlinPos.clone()) * Math.PI * 3 - Math.PI * 3 / 2) * mouseLerp/10
        + temp.rotation.y * (1 - mouseLerp/10);

      let objX = temp.position.x
      let objY = temp.position.y
      let objZ = temp.position.z

      let mouseX = (mouse.x * viewport.width) / 2
      let mouseY = (mouse.y * viewport.height) / 2

      let xOffset = 0
      let yOffset = 0
      let zOffset = 0

      let dist = Math.sqrt(
        Math.pow(mouseX - objX, 2) + Math.pow(mouseY - objY, 2)
      )
      let angle = Math.atan2(objY - mouseY, objX - mouseX)
      if (dist < mouseRadius) {
        let effectStrength = Math.pow(1 - dist / mouseRadius, 1.5)
        // xOffset = Math.cos(angle) * effectStrength * mouseStrength;
        // yOffset = Math.sin(angle) * effectStrength * mouseStrength;
        zOffset = -effectStrength * mouseStrength
      }
      temp.position.x += xOffset
      temp.position.y += yOffset
      temp.position.z += zOffset

      screenSpaceCache[i].x =
        screenSpaceCache[i].x * (1 - mouseLerp) + temp.position.x * mouseLerp
      screenSpaceCache[i].y =
        screenSpaceCache[i].y * (1 - mouseLerp) + temp.position.y * mouseLerp
      screenSpaceCache[i].z =
        screenSpaceCache[i].z * (1 - mouseLerp) + temp.position.z * mouseLerp

      temp.position.x = screenSpaceCache[i].x
      temp.position.y = screenSpaceCache[i].y
      temp.position.z = screenSpaceCache[i].z
      temp.updateMatrix()
      instancedRef.current.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    instancedRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh
      ref={instancedRef}
      args={[null, null, screenSpaceCoords.length]}
    >
      {shape == 'cube' ? (
        <boxGeometry args={[shapeSize, shapeSize, shapeSize]} />
      ) : null}
      {shape == 'sphere' ? <sphereGeometry args={[shapeSize]} /> : null}
      {shape == 'ico' ? <icosahedronGeometry args={[shapeSize]} /> : null}
      <meshStandardMaterial color={'#FFFFFF'} roughness={roughness} metalness={metalness} />
    </instancedMesh>
  )
}

function MouseLight() {
  const mouseLight = useControls('mouse light', {
    intensity: 0.4,
    multiplier: 1.5,
    color: '#ff005b',
    z: 5,
    lerp: 0.1,
  })

  const mouseLightPositionCache = new THREE.Vector3()
  const mouseLightRef = useRef()
  const { viewport } = useThree()
  useFrame(({ mouse }) => {
    mouseLightPositionCache.x =
      ((mouse.x * viewport.width) / 2) * mouseLight.multiplier
    mouseLightPositionCache.y =
      ((mouse.y * viewport.height) / 2) * mouseLight.multiplier
    mouseLightRef.current.position.z = mouseLight.z

    mouseLightRef.current.position.x =
      mouseLightPositionCache.x * mouseLight.lerp +
      mouseLightRef.current.position.x * (1 - mouseLight.lerp)
    mouseLightRef.current.position.y =
      mouseLightPositionCache.y * mouseLight.lerp +
      mouseLightRef.current.position.y * (1 - mouseLight.lerp)
  })
  return (
    <>
      <directionalLight
        ref={mouseLightRef}
        intensity={mouseLight.intensity}
        color={mouseLight.color}
      />
    </>
  )
}

export default function InstancedGrid() {
  // const [scroll, setScroll] = useState(0)
  // const scrollHandler = () => {
  //   let s = window.scrollY / (document.body.scrollHeight - window.innerHeight)
  //   setScroll(s)
  //   requestAnimationFrame(scrollHandler)
  // }

  const ambient = useControls('ambient light', {
    intensity: 0.4,
    color: '#ff005b',
  })
  const light1 = useControls('light1', {
    intensity: 0.4,
    color: '#00ff5b',
    position: {
      value: {
        x: 3,
        y: 0,
        z: 5,
      },
    },
  })
  const light2 = useControls('light2', {
    intensity: 0.4,
    color: '#5b00ff',
    position: {
      value: {
        x: -3,
        y: 0,
        z: 5,
      },
    },
  })
  return (
    <div className='bg-black w-screen h-screen fixed top-0 left-0'>
      <Canvas>
        <ambientLight intensity={ambient.intensity} color={ambient.color} />
        <MouseLight />
        <directionalLight
          intensity={light1.intensity}
          color={light1.color}
          position={[light1.position.x, light1.position.y, light1.position.z]}
        />
        <directionalLight
          intensity={light2.intensity}
          color={light2.color}
          position={[light2.position.x, light2.position.y, light2.position.z]}
        />
        <InstancedPerlin />
        <EffectComposer multisampling={8}>
          <SSAO
            blendFunction={BlendFunction.MULTIPLY} // blend mode
            samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
            rings={4} // amount of rings in the occlusion sampling pattern
            distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
            distanceFalloff={0.0} // distance falloff. min: 0, max: 1
            rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
            rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
            luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
            radius={20} // occlusion sampling radius
            scale={0.5} // scale of the ambient occlusion
            bias={0.5} // occlusion bias
          />
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
