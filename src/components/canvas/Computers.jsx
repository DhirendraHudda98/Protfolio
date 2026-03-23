import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current && isMobile) {
      meshRef.current.rotation.y += delta * 0.5; // Adjust rotation speed as needed
    }
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.75 : 0.75}
        position={isMobile ? [0, -3, 0] : [0, -3.25, -1.5]}
        rotation={isMobile ? [0, 0, 0] : [-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const WeatherPrecipitation = ({ mode, isMobile }) => {
  const pointsRef = useRef();
  const mobileFactor = isMobile ? 0.45 : 1;

  const config = useMemo(() => {
    if (mode === "snow") {
      return {
        count: Math.round(900 * mobileFactor),
        size: isMobile ? 0.065 : 0.075,
        color: "#f5f9ff",
        speedMin: 0.9,
        speedMax: 1.8,
      };
    }
    if (mode === "storm") {
      return {
        count: Math.round(1800 * mobileFactor),
        size: isMobile ? 0.035 : 0.04,
        color: "#79b8ff",
        speedMin: 4.8,
        speedMax: 7.5,
      };
    }
    return {
      count: Math.round(1200 * mobileFactor),
      size: isMobile ? 0.026 : 0.03,
      color: "#8ecbff",
      speedMin: 3.6,
      speedMax: 5.8,
    };
  }, [isMobile, mobileFactor, mode]);

  const positions = useMemo(() => {
    const arr = new Float32Array(config.count * 3);
    for (let i = 0; i < config.count; i += 1) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 22;
      arr[i3 + 1] = Math.random() * 18 - 2;
      arr[i3 + 2] = (Math.random() - 0.5) * 22;
    }
    return arr;
  }, [config.count]);

  const basePositions = useMemo(() => positions.slice(), [positions]);

  const speeds = useMemo(() => {
    const arr = new Float32Array(config.count);
    for (let i = 0; i < config.count; i += 1) {
      arr[i] = config.speedMin + Math.random() * (config.speedMax - config.speedMin);
    }
    return arr;
  }, [config]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const attribute = pointsRef.current.geometry.attributes.position;
    const data = attribute.array;

    for (let i = 0; i < config.count; i += 1) {
      const i3 = i * 3;
      data[i3 + 1] -= speeds[i] * delta;

      if (mode === "snow") {
        data[i3] += Math.sin((data[i3 + 1] + i) * 0.06) * 0.01;
      } else {
        data[i3] -= 0.015;
      }

      if (data[i3 + 1] < -3.5) {
        data[i3] = basePositions[i3];
        data[i3 + 1] = 15 + Math.random() * 4;
        data[i3 + 2] = basePositions[i3 + 2];
      }
    }

    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color={config.color}
        size={config.size}
        sizeAttenuation
        transparent
        opacity={mode === "storm" ? 0.7 : 0.62}
        depthWrite={false}
      />
    </points>
  );
};

const StormFlash = () => {
  const flashRef = useRef();

  useFrame(() => {
    if (!flashRef.current) return;
    const trigger = Math.random();
    if (trigger > 0.992) {
      flashRef.current.intensity = 4 + Math.random() * 4;
    } else {
      flashRef.current.intensity = Math.max(0.2, flashRef.current.intensity * 0.9);
    }
  });

  return <pointLight ref={flashRef} color="#d7e8ff" intensity={0.2} position={[2, 8, 2]} distance={30} />;
};

const WeatherEffects = ({ mode, isMobile }) => {
  if (mode === "clear") {
    return null;
  }

  return (
    <>
      {(mode === "rain" || mode === "snow" || mode === "storm") && (
        <WeatherPrecipitation mode={mode} isMobile={isMobile} />
      )}
      {(mode === "fog" || mode === "storm") && <fog attach="fog" args={["#7b89a6", 6, 28]} />}
      {mode === "storm" && <StormFlash />}
    </>
  );
};

const ComputersCanvas = ({ weatherMode = "clear" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={isMobile ? 
        { position: [0, 0, 20], fov: 50 } : 
        { position: [20, 3, 5], fov: 25 }
      }
      gl={{ preserveDrawingBuffer: true, alpha: true }}
    >
      <color attach="background" args={["#0a0a1a"]} />
      <Suspense fallback={<CanvasLoader />}>
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate={true}
          />
        )}
        <Computers isMobile={isMobile} />
        <WeatherEffects mode={weatherMode} isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;