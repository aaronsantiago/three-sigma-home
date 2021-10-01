import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, createPortal } from "@react-three/fiber";
import { useFBO, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import ScreenFx from "./ScreenFx";

function MagicMirror({ children, ...props }) {
  const cam = useRef();
  // useFBO creates a WebGL2 buffer for us, it's a helper from the "drei" library
  const fbo = useFBO();
  // The is a separate scene that we create, React will portal into that
  const [scene] = useState(() => new THREE.Scene());
  // Tie this component into the render-loop
  useFrame((state) => {
    // Our portal has its own camera, but we copy the originals world matrix
    // cam.current.matrixWorldInverse.copy(state.camera.matrixWorldInverse);
    // Then we set the render-target to the buffer that we have created
    state.gl.setRenderTarget(fbo);
    // We render the scene into it, using the local camera that is clamped to the planes aspect ratio
    state.gl.render(scene, cam.current);
    // And flip the render-target to the default again
    state.gl.setRenderTarget(null);
  });
  return (
    <>
      <mesh {...props}>
        <planeGeometry args={[16/2, 9/2]} />
        {/* The "mirror" is just a boring plane, but it receives the buffer texture */}
        <meshBasicMaterial map={fbo.texture} />
      </mesh>
      <PerspectiveCamera
        manual
        ref={cam}
        fov={50}
        aspect={16/ 9}
        onUpdate={(c) => c.updateProjectionMatrix()}
      />
      {/* This is React being awesome, we portal this components children into the separate scene above */}
      {createPortal(children, scene)}
    </>
  );
}

export default function Scene2() {
  const [scroll, setScroll] = useState(0);
  const renderTarget = useRef(
    new THREE.WebGLRenderTarget(600, 400, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBFormat,
    })
  );
  const scrollHandler = () => {
    let s = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    setScroll(s);
    requestAnimationFrame(scrollHandler);
  };

  useEffect(() => {
    requestAnimationFrame(scrollHandler);
  }, []);

  return (
    <>
      <div class="bg-blue-500 w-screen h-screen">
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight position={[3, 0, 5]} />
          {/* <ScreenFx/> */}
          <MagicMirror rotation={[-(1 - scroll) * Math.PI * 8,0,0]} position={[0,0,-(1-scroll) * 100]}>
            <ScreenFx/>
          </MagicMirror>
        </Canvas>
      </div>
    </>
  );
}
