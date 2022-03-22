import "./styles.css";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RepeatWrapping } from "three";
import { useTexture } from "@react-three/drei";

import { shaderData } from "./shaderData";

import perlinNoise from "../public/perlin.png";

const uniforms = {
  perlin: { type: "t", value: undefined },
  time: { type: "f", value: 0 }
};

function Plane() {
  const planeRef = useRef();

  const perlinVal = useTexture(perlinNoise);
  perlinVal.wrapS = perlinVal.wrapT = RepeatWrapping;
  perlinVal.repeat.set(1, 1);

  uniforms.perlin.value = perlinVal;

  useFrame(() => {
    uniforms.time.value += 0.01;
  });

  return (
    <mesh
      ref={planeRef}
      rotation={[0, 0, 0]}
      position={[0, 0, 0]}
      scale={[10, 10, 10]}
    >
      <planeBufferGeometry />
      <shaderMaterial
        fragmentShader={shaderData.frag}
        vertexShader={shaderData.vert}
        uniforms={uniforms}
      />
    </mesh>
  );
}
function Cube() {
  const cubeRef = useRef();

  useFrame((state) => {
    let sinTime = Math.sin(state.clock.elapsedTime * 4.0) * 0.5;

    cubeRef.current.rotation.y += 0.01;
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.z += 0.01;
    cubeRef.current.position.y = sinTime;
  });

  return (
    <mesh ref={cubeRef} rotation={[1.0, 0.6, 2.4]} position={[0, 0, 2]}>
      <boxBufferGeometry />
      <meshStandardMaterial roughness={0} color="White" />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="App">
      <Canvas style={{ background: "black", height: "1024px", width: "100vw" }}>
        <pointLight intensity={0.5} color={"Blue"} position={[0, 3, 5]} />
        <pointLight intensity={1} color={"Red"} position={[3, 0, 5]} />
        <Suspense fallback={null}>
          <Cube />
          <Plane />
        </Suspense>
      </Canvas>
    </div>
  );
}
