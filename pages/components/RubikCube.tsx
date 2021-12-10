import textureFace from '../../lib/textureFace';
import CubeMaterial from './CubeMaterial';
import {FC} from 'react';

const BasicParams = {
  x: 0,
  y: 0,
  z: 0,
  number: 3,
  edgeLength: 50,
  //右、左、上、下、前、后
  colors: ['#ff6b02', '#dd422f',
    '#ffffff', '#fdcd02',
    '#3d81f7', '#019d53']
};

const RubikCube: FC = () => {

  const {x, y, z, colors, number, edgeLength} = BasicParams

  const leftUpX = x - number / 2 * edgeLength;
  const leftUpY = y + number / 2 * edgeLength;
  const leftUpZ = z + number / 2 * edgeLength;

  return (
    <>
      {
        new Array(BasicParams.number).fill('').map((item, layer) => {
          return new Array(BasicParams.number * BasicParams.number).fill('').map((item, index) => {
            const materials = new Array(6).fill('').map((face, faceIndex) => {
              return <CubeMaterial
                key={`${layer}-${index}-${faceIndex}`}
                color={colors[faceIndex]}
              />
            })

            return <mesh
              key={`${layer}-${index}`}
              position={[
                (leftUpX + edgeLength / 2) + (index % number) * edgeLength,
                (leftUpY - edgeLength / 2) - Math.floor(index / number) * edgeLength,
                (leftUpZ - edgeLength / 2) - layer * edgeLength
              ]}
            >
              <boxBufferGeometry attach='geometry' args={[edgeLength, edgeLength, edgeLength]} />
              {materials}
            </mesh>
          })
        })
      }
    </>
  )
}

export default RubikCube