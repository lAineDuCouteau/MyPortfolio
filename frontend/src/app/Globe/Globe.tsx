import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import styles from "./Globe.module.scss";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { Text } from "@react-three/drei";



// Convert lat/lon to 3D position
const latLongToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z] as [number, number, number];
};

// Continent button
const ContinentButton = ({ lat, lon, label }: { lat: number; lon: number; label: string }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (label === "Home") navigate("/");
    else if (label === "About Me") navigate("/about");
  };

  const position = latLongToVector3(lat, lon, 1.96);
  const direction = new THREE.Vector3(...position).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  return (
     <mesh position={position} quaternion={quaternion} scale={0.1} onClick={handleClick} onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}>
      <cylinderGeometry args={[6, 7, 1, 6]} />
      <meshStandardMaterial color="gray" />
      
      {/* 3D Text flat on top of the button */}
      <Text
        position={[0, 0.6, 0]}   // slightly above the cylinder
        rotation={[Math.PI / -2, 0, 0]} // make it flat on the top face
        fontSize={1.5}               // adjust size to fit the button
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </mesh>
  );
};

// Rotating globe + buttons group
const RotatingGlobe = ({ buttonPositions, labels }: any) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // Rotate the whole globe
    }
  });

  return (
    <group ref={groupRef}>
      {/* Globe */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>

      {/* Buttons */}
      {buttonPositions.map(([lat, lon]: number[], idx: number) => (
        <ContinentButton key={idx} lat={lat} lon={lon} label={labels[idx]} />
      ))}
    </group>
  );
};

const Globe = () => {
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
    "Contact",
    "Hobbies",
    "Music",
    "About Me",
    "Experience",
  ];

  return (
    <div className={styles.globeContainer}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <RotatingGlobe buttonPositions={buttonPositions} labels={labels} />
<OrbitControls 
  enableZoom={false} 
  minPolarAngle={0} 
  maxPolarAngle={Math.PI} 
/>
      </Canvas>
    </div>
  );
};

export default Globe;
