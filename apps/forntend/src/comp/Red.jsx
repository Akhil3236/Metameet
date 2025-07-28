import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

const Red = () => {
  const { scene } = useGLTF('/models/among_us_-_3d_among_us_model.glb');
  const modelRef = useRef();

  useEffect(() => {
    if (scene) {
      const cloned = clone(scene);
      modelRef.current.add(cloned);
    }
  }, [scene]);

  return <group ref={modelRef} scale={[0.1, 0.1, 0.1]}
   rotation={[1.2,0, 0]}
   position={[0, 0, 0]}
  />;
};

export default Red;
