import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import styles from "./Globe.module.scss";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

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

  const position = latLongToVector3(lat, lon, 1.98);
  const direction = new THREE.Vector3(...position).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  );

  return (
    <mesh position={position} quaternion={quaternion} scale={0.1} onClick={handleClick}>
      <cylinderGeometry args={[5, 5, 1, 6]} />
      <meshStandardMaterial color="gray" />
      <Html distanceFactor={10}>
        <div style={{ color: "white", fontSize: "12px", textAlign: "center" }}>{label}</div>
      </Html>
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
    [-95, -90],
    [-10, -10],
    [15, 120],
    [-15, -120],
    [140, 30],
  ];

  const labels = [
    "Home",
    "About Me",
    "Projects",
    "Contact",
    "Hobbies",
    "Music",
    "Foods",
    "Experience",
  ];

  return (
    <div className={styles.globeContainer}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <RotatingGlobe buttonPositions={buttonPositions} labels={labels} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default Globe;
