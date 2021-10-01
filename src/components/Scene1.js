import { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";

function CustomRender() {
  const state = useThree();
  window.renderer = state.gl;
  return null;
}

export default function Scene1() {
  const [scroll, setScroll] = useState(0);
  const scrollHandler = () => {
    let s = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    setScroll(s);
    requestAnimationFrame(scrollHandler);
  }

  useEffect(() => {
    requestAnimationFrame(scrollHandler);
  }, []);
  return (
    <div className="bg-green-500 w-screen h-screen">
      <Canvas>
        <CustomRender/>
        <ambientLight intensity={0.1} />
        <directionalLight position={[3, 0, 5]} />
        <mesh rotation={[Math.PI/8, scroll * Math.PI*6, 0]}>
          <boxGeometry/>
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
