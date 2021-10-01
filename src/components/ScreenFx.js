import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { WaveMaterial } from "./WaveMaterial";

function ShaderPlane(props) {
  const ref = useRef();
  const planeRef = useRef();
  const { width, height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.time += delta;
    planeRef.current.rotation.x += delta / 4;
    planeRef.current.rotation.y =
      (Math.sin(ref.current.time / 2) * Math.PI) / 4;
  });
  return (
    <mesh {...props} ref={planeRef}>
      <torusKnotGeometry args={[1, 0.3, 300, 30]} />
      {/* <dodecahedronGeometry args={[1, 3]}/> */}
      {/* <boxGeometry args={[1, 1, 1, 16]} /> */}
      {/* We use the materials module 🔑 to allow HMR replace */}
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        colorStart="#ef476f"
        colorMid="#ffd166"
        colorEnd="#118ab2"
      />
    </mesh>
  );
}

export default function ScreenFx() {
  let list = [];
  let cap = 20;
  for (let i = 0; i < cap; i++) {
    list.push(i);
  }
  return (
    <>
      {/* {list.map((el, i) => {
        return <ShaderPlane scale={[Math.pow(i/cap, .5), Math.pow(i/cap, .5), Math.pow(i/cap, .5)]} position={[i/3 - 4, Math.sin(i), 0]} rotation={[i * Math.PI * 3,0,i*Math.PI/8]}/>;
      })} */}
      <ShaderPlane
        position={[0, 0, -10]}
        rotation={[2.648, 4.12, 0]}
        scale={[3.9, 3.9, 3.9]}
      />
      <ShaderPlane
        position={[0, 0, -20]}
        rotation={[1.648, 7.43, 0]}
        scale={[9.9, 9.9, 9.9]}
      />
      <ShaderPlane position={[0, 0, -30]} scale={[15.9, 15.9, 15.9]} />
      <color attach="background" args={["#f0efeb"]} />
    </>
  );
}
