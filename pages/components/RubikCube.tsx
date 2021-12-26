import CubeMaterial from './CubeMaterial';
import {FC, useEffect, useRef, useState} from 'react';
import {basicParams} from '../../lib/basicParams';
import {Matrix4, Mesh, Vector3} from 'three';
import {GroupProps, useFrame} from '@react-three/fiber';
import {getDirection} from '../../lib/rotateVectors';
import CoverCube from './CoverCube';
import {getChangedCubes, getCubeIndex} from '../../lib/getCubeIndex';
import { useSpring, animated } from '@react-spring/three'
import {rotateAroundWorldAxis} from '../../lib/rotateAroundWorldAxis';
import {degToRad} from '../../lib/degToRad';
import {useDrag, useGesture} from '@use-gesture/react';

export type TouchParams = {
  startPoint: Vector3 | null;
  movePoint: Vector3 | null;
  endPoint: Vector3 | null;
  normalVector: Vector3 | null;
  cubePosition: Vector3 | null;
  direction: number | null;
}

const RubikCube: FC = () => {

  const {x, y, z, colors, number, edgeLength} = basicParams

  const leftUpX = x - number / 2 * edgeLength;
  const leftUpY = y + number / 2 * edgeLength;
  const leftUpZ = z + number / 2 * edgeLength;

  const [isRotating, setIsRotating] = useState<boolean>(false)
  const [cubeIndexList, setCubeIndexList] = useState<string[]>(Array.from(new Array(27).keys()).map(item => `cube-${item}`))
  const [cubeFaces, setCubeFaces] = useState<string>('UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB')

  const [touchParams, setTouchParams] = useState<TouchParams>({
    startPoint: null,
    movePoint: null,
    endPoint: null,
    normalVector: null,
    cubePosition: null,
    direction: null,
  })
  const { startPoint, movePoint, endPoint, normalVector, cubePosition } = touchParams

  const meshGroup = useRef<GroupProps | null>(null)

  useEffect(() => {

  }, [isRotating, touchParams])

  const [meshList, setMeshList] = useState<Mesh[]>([])
  const [appliedRotateMatrix, setAppliedRotateMatrix] = useState<Matrix4 | null>(null)

  const [counter, setCounter] = useState<number>(0)

  const [lastMovePoint, setLastMovePoint] = useState<Vector3 | null>(null)

  // useFrame(() => {
  //   if (endPoint) {
  //     resetParams()
  //   }
  //   console.log('useFrame')
  //   if (isRotating && meshGroup.current && startPoint && movePoint && normalVector && movePoint !== lastMovePoint) {
  //     console.log('rotating...')
  //     setLastMovePoint(movePoint)
  //     const sub = movePoint.sub(startPoint)
  //     if (!touchParams.direction) {
  //       const direction = getDirection(meshGroup.current, sub, normalVector) || null
  //       setTouchParams(prevState => ({...prevState, direction: direction}))
  //     }
  //     const cubeIndex = getCubeIndex(startPoint, edgeLength)
  //     if (touchParams.direction) {
  //       const changedCubes = getChangedCubes(cubeIndex, touchParams.direction)
  //       const meshGroupObject = meshGroup.current
  //       if (meshGroupObject) {
  //         const changedCubeObjects = meshGroupObject.children as Array<Mesh>
  //         const result = changedCubeObjects.filter(cube => changedCubes.includes(getCubeIndex(cube.position, edgeLength)))
  //         rotateAnimation(result, touchParams.direction)
  //       }
  //     }
  //   }
  // })

  const rotateAnimation = (cubes: Mesh[], direction: number) => {
    let rotateMatrix = new Matrix4();//旋转矩阵
    const origin = new Vector3(0, 0, 0);
    const xLine = new Vector3(1, 0, 0);
    const yLine = new Vector3(0, 1, 0);
    const zLine = new Vector3(0, 0, 1);
    if (cubes.length && direction) {
      switch (direction) {
        case 0.1:
        case 1.2:
        case 2.4:
        case 3.3:
          rotateMatrix = rotateAroundWorldAxis(origin, zLine, -degToRad(1));
          break;
        case 0.2:
        case 1.1:
        case 2.3:
        case 3.4:
          rotateMatrix = rotateAroundWorldAxis(origin, zLine, degToRad(1));
          break;
        case 0.4:
        case 1.3:
        case 4.3:
        case 5.4:
          rotateMatrix = rotateAroundWorldAxis(origin, yLine, -degToRad(1));
          break;
        case 1.4:
        case 0.3:
        case 4.4:
        case 5.3:
          rotateMatrix = rotateAroundWorldAxis(origin, yLine, degToRad(1));
          break;
        case 2.2:
        case 3.1:
        case 4.1:
        case 5.2:
          rotateMatrix = rotateAroundWorldAxis(origin, xLine, degToRad(1));
          break;
        case 2.1:
        case 3.2:
        case 4.2:
        case 5.1:
          rotateMatrix = rotateAroundWorldAxis(origin, xLine, -degToRad(1));
          break;
        default:
          break;
      }
      cubes.map(item => item.applyMatrix4(rotateMatrix))
    }
  }

  const resetParams = () => {
    setTouchParams({
      startPoint: null,
      movePoint: null,
      endPoint: null,
      normalVector: null,
      cubePosition: null,
      direction: null,
    })
    setIsRotating(false)
  }

  return (
    <>
      <CoverCube
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        resetParams={resetParams}
        touchParams={touchParams}
        setTouchParams={setTouchParams}
      />
      <group ref={meshGroup}>
        {
          new Array(number).fill('').map((item, layer) => {
            return new Array(number * number).fill('').map((item, index) => {
              const materials = new Array(6).fill('').map((face, faceIndex) => {
                return <CubeMaterial
                  key={`${layer}-${index}-${faceIndex}`}
                  color={colors[faceIndex]}
                />
              })
              return <animated.mesh
                key={`${layer}-${index}`}
                position={[
                  (leftUpX + edgeLength / 2) + (index % number) * edgeLength,
                  (leftUpY - edgeLength / 2) - Math.floor(index / number) * edgeLength,
                  (leftUpZ - edgeLength / 2) - layer * edgeLength
                ]}
                // onPointerDown={(event) => {
                //   event.stopPropagation()
                // }}
              >
                <boxBufferGeometry attach='geometry' args={[edgeLength, edgeLength, edgeLength]} />
                {materials}
              </animated.mesh>
            })
          })
        }
      </group>
    </>
  )
}

export default RubikCube
