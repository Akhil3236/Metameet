import React from 'react'
import { useGLTF } from '@react-three/drei';

function Backgorund() {

    
  const { scene } = useGLTF('/models/Akhiltuluiri.glb');
  
  return (
      <primitive
       object={scene}
       scale={[1.6, 0.9, 1.4]}
       rotation={[ Math.PI/2, 0, 0]
        
       }
      />
  )
}

export default Backgorund