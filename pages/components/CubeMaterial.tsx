import {FC} from 'react';
import textureFace from '../../lib/textureFace';

interface CubeMaterialProps {
  color: string;
}

const CubeMaterial: FC<CubeMaterialProps> = (props) => {
  const { color } = props

  const texture = <canvasTexture attach="map" image={textureFace(color)} />

  return <meshLambertMaterial attachArray="material">
    { texture }
  </meshLambertMaterial>
}

export default CubeMaterial