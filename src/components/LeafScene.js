import { useRef, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Perlin } from 'three-noise'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'
import { BlendFunction } from 'postprocessing'
import { SSAO, EffectComposer, Bloom } from '@react-three/postprocessing'
import { useFBX } from '@react-three/drei'

export default function LeafScene() {
  // let fbx = useFBX('models/leaf.fbx')
  // const materials = useLoader(MTLLoader, "/models/leaf.mtl")
  // const object = useLoader(OBJLoader, "/models/leaf.obj", loader => {
  //   materials.preload()
  //   loader.setMaterials(materials)
  // })

  return (
    <div className='bg-black w-screen h-screen fixed top-0 left-0'>
      <Canvas>
        {/* <ambientLight intensity={ambient.intensity} color={ambient.color} /> */}
        {/* <primitive object={fbx}  dispose={null} /> */}
      </Canvas>
    </div>
  )
}
