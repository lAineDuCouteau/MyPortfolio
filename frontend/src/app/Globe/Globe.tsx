import React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import styles from "./Globe.module.scss"

const Globe = () => {
  return (
    <div className={styles.globeContainer}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        <Sphere args={[2, 64, 64]} scale={1.5}>
          <meshStandardMaterial color="purple" />
        </Sphere>

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  )
}

export default Globe
