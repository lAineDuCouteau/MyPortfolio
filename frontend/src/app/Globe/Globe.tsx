import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import styles from "./Globe.module.scss";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

// lat/lon -> vector
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z] as [number, number, number];
};

// Button
const ContinentButton = ({
  lat,
  lon,
  label,
  onButtonClick,
}: {
  lat: number;
  lon: number;
  label: string;
  onButtonClick: (label: string) => void;
}) => {
  const position = latLongToVector3(lat, lon, 1.93);
  const direction = new THREE.Vector3(...position).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  return (
    <mesh
      position={position}
      quaternion={quaternion}
      scale={0.1}
      onClick={() => onButtonClick(label)}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      <cylinderGeometry args={[6, 7, 1.5, 5]} />
      <meshStandardMaterial color="gray" />
      <Text
        position={[0, 0.8, 0]}
        rotation={[Math.PI / -2, 0, 0]}
        fontSize={1.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </mesh>
  );
};

const RotatingGlobe = ({ buttonPositions, labels, onButtonClick, zoomingOut }: any) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [progress, setProgress] = useState(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // intro zoom-in (scale up)
    if (progress < 1 && !zoomingOut) {
      setProgress((p) => Math.min(1, p + delta * 1.4));
      const s = THREE.MathUtils.lerp(1.5, 2, progress);
      groupRef.current.scale.set(s, s, s);
    }

    // zoom out on click (scale down)
    if (zoomingOut && groupRef.current.scale.x > 0) {
      const s = Math.max(0, groupRef.current.scale.x - delta * 1.5);
      groupRef.current.scale.set(s, s, s);
    }

    // keep rotating
    groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="darkgray" />
      </mesh>
      {buttonPositions.map(([lat, lon]: number[], idx: number) => (
        <ContinentButton
          key={idx}
          lat={lat}
          lon={lon}
          label={labels[idx]}
          onButtonClick={onButtonClick}
        />
      ))}
    </group>
  );
};


// Animated Camera
// AnimatedCamera – keep camera fixed
const AnimatedCamera = () => {
  return (
    <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
  );
};

const Globe = () => {
  const [zoomingOut, setZoomingOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // After mount, fade out the black overlay
    const timer = setTimeout(() => setFadeIn(false), 100); 
    return () => clearTimeout(timer);
  }, []);

  const buttonPositions = [
    [30, 30],
    [-30, 60],
    [45, -45],
    [-95, -55],
    [-20, -40],
    [15, 120],
    [-15, -120],
    [140, 30],
  ];

  const labels = [
    "Home",
    "Foods",
    "Projects",
    "Contacts",
    "Hobbies",
    "Music",
    "About Me",
    "Experience",
  ];

  const handleButtonClick = (label: string) => {
    setZoomingOut(true);
    setFade(true); // trigger fade overlay

    setTimeout(() => {
      if (label === "Home") navigate("/");
      else if (label === "About Me") navigate("/about");
      else if (label === "Contacts") navigate("/contacts");
    }, 1500); // match zoom + fade duration
  };

  return (
    <div className={styles.globeContainer}>
      <Canvas>
  <ambientLight intensity={0.5} />
  <directionalLight position={[5, 5, 5]} />
  <AnimatedCamera />
  <RotatingGlobe
    buttonPositions={buttonPositions}
    labels={labels}
    onButtonClick={handleButtonClick}
    zoomingOut={zoomingOut}
  />
  <OrbitControls enableZoom={false} minPolarAngle={0} maxPolarAngle={Math.PI} />
</Canvas>


      {/* Fade Overlay */}
<div
  className={`
    ${styles.fadeOverlay} 
    ${(fade || fadeIn) ? styles.fadeActive : ""}
  `}
/>

    </div>
  );
};

export default Globe;
