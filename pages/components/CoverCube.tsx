import {FC, useState} from 'react';
import {basicParams} from '../../lib/basicParams';
import {ThreeEvent, useFrame, Vector3Props} from '@react-three/fiber';
import {Vector3} from 'three';
import {TouchParams} from './RubikCube';
import {useDrag} from '@use-gesture/react';
import {animated} from '@react-spring/three';

interface CoverCubeProps {
  isRotating: boolean;
  setIsRotating: (isRotating: boolean) => void;
  resetParams: () => void;
  touchParams: TouchParams;
  setTouchParams: (touchParams: TouchParams) => void;
}

const CoverCube: FC<CoverCubeProps> = (props) => {
  const { isRotating, setIsRotating, resetParams, touchParams, setTouchParams } = props
  const {x, y, z, colors, number, edgeLength} = basicParams

  const boxWidth = edgeLength * number + 0.00001

  useFrame(() => {

  })

  const onTouchStart = (event: ThreeEvent<PointerEvent>) => {
    // event.stopPropagation()
    if (!isRotating && event.intersections[1]) {
      const cubePosition = event.intersections[1]?.eventObject.position
      setTouchParams({...touchParams, startPoint: event.intersections[1].point, cubePosition: cubePosition})
    }
  }

  const onTouchMove = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    if (!isRotating && touchParams.startPoint && event.point && event.face?.normal) {
      console.log(event)
      setTouchParams({...touchParams, movePoint: event.point, normalVector: event.face.normal})
    }
  }

  const onTouchEnd = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    console.log(event)
    resetParams();
  }

  const bind = useDrag(
    ({type, event}) => {
      // @ts-ignore
      const {point, face} = event
      if (type === 'pointerdown') {
        setTouchParams({...touchParams, startPoint: point})
        setIsRotating(true)
      } else if (type === 'pointermove') {
        setTouchParams({...touchParams, movePoint: point, normalVector: face.normal})
      } else if (type === 'pointerup') {
        setTouchParams({...touchParams, endPoint: point})
        setIsRotating(false)
      }
    },
    { pointerEvents: true }
  )

  // @ts-ignore
  return <mesh
    key='cover-cube'
    // onPointerDown={onTouchStart}
    // onPointerMove={onTouchMove}
    // onPointerUp={onTouchEnd}
    {...bind()}
  >
    <boxBufferGeometry attach='geometry' args={[boxWidth, boxWidth, boxWidth]} />
    <meshBasicMaterial attach='material' opacity={0}  transparent={true}/>
  </mesh>
}

export default CoverCube