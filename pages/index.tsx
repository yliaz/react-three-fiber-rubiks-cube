import type { NextPage } from 'next'
import {Canvas} from '@react-three/fiber';
import RubikCube from './components/RubikCube';
import {OrbitControls} from '@react-three/drei';
import {useEffect, useRef} from 'react';
import { render, events } from '@react-three/fiber'
import Lights from './components/Lights';


const Home: NextPage = () => {

  const canvas = useRef<HTMLCanvasElement | null>(null)

  const Mesh = (
    <>
      <Lights />
      <RubikCube />
      <OrbitControls enableDamping={true} />
    </>
  )

  useEffect(() => {
    if (canvas.current) {
      canvas.current.style.width = `${window.innerWidth}px`
      canvas.current.style.height = `${window.innerHeight}px`
    }
    window.addEventListener('resize', () => {
      console.log('width: ', window.innerWidth, 'height: ', window.innerHeight)
      if (canvas.current) {
        render(Mesh, canvas.current, {
          events,
          size: { width: window.innerWidth, height: window.innerHeight },
        })
      }
    })
  }, [])

  return (
    <>
      {
        process.browser
          ? <Canvas camera={{position: [-300, 200, 300], fov: 60}} ref={canvas} dpr={Math.max(window.devicePixelRatio, 2)}>
            {Mesh}
          </Canvas>
          : null
      }
    </>
  )
}

export default Home
