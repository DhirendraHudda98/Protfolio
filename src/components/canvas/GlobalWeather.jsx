import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const GlobalPrecipitation = ({ mode, isMobile }) => {
  const pointsRef = useRef();
  const mobileFactor = isMobile ? 0.55 : 1;

  const config = useMemo(() => {
    if (mode === "snow") {
      return {
        count: Math.round(2200 * mobileFactor),
        size: isMobile ? 0.075 : 0.085,
        color: "#f8fbff",
        speedMin: 0.7,
        speedMax: 1.7,
      };
    }

    if (mode === "storm") {
      return {
        count: Math.round(1700 * mobileFactor),
        size: isMobile ? 0.03 : 0.035,
        color: "#8ecbff",
        speedMin: 4.6,
        speedMax: 7.2,
      };
    }

    return {
      count: Math.round(1900 * mobileFactor),
      size: isMobile ? 0.028 : 0.034,
      color: "#9dd4ff",
      speedMin: 3.4,
      speedMax: 5.5,
    };
  }, [isMobile, mobileFactor, mode]);

  const positions = useMemo(() => {
    const arr = new Float32Array(config.count * 3);
    for (let i = 0; i < config.count; i += 1) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 30;
      arr[i3 + 1] = Math.random() * 20 - 3;
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
        data[i3] += Math.sin((data[i3 + 1] + i) * 0.07) * 0.012;
      } else {
        data[i3] -= 0.018;
      }

      if (data[i3 + 1] < -4.5) {
        data[i3] = basePositions[i3];
        data[i3 + 1] = 16 + Math.random() * 5;
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
        opacity={mode === "snow" ? 0.62 : 0.52}
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
    if (trigger > 0.9935) {
      flashRef.current.intensity = 1.8 + Math.random() * 2.2;
    } else {
      flashRef.current.intensity = Math.max(0.06, flashRef.current.intensity * 0.88);
    }
  });

  return <pointLight ref={flashRef} color="#d9e9ff" intensity={0.06} position={[0, 6, 3]} distance={30} />;
};

const GlobalWeatherScene = ({ mode, isMobile }) => {
  if (mode === "clear") {
    return null;
  }

  return (
    <>
      {(mode === "rain" || mode === "snow" || mode === "storm") && (
        <GlobalPrecipitation mode={mode} isMobile={isMobile} />
      )}
      {(mode === "fog" || mode === "storm") && <fog attach="fog" args={["#7d8ca8", 7, 26]} />}
      {mode === "storm" && <StormFlash />}
    </>
  );
};

const GlobalWeatherCanvas = ({ mode = "snow" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.22} />
      <Suspense fallback={null}>
        <GlobalWeatherScene mode={mode} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default GlobalWeatherCanvas;
