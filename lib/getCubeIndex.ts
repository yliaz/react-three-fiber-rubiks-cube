import {Vector3} from 'three';

export const getCubeIndex = (point: Vector3, edgeLength: number) => {
  const length = edgeLength * 0.4
  const { x, y, z } = point
  const a = x > length ? 2 : x < -length ? 0 : 1
  const b = y > length ? 0 : y < -length ? 2 : 1
  const c = z > length ? 0 : z < -length ? 2 : 1
  return a + b * 3 + c * 9
}

export const getChangedCubes = (cubeIndex: number, direction: number) => {
  console.log('cubeIndex: ', cubeIndex)
  console.log('direction: ', direction)
  const cubeIndexes = Array.from(new Array(27).keys())
  switch (direction) {
    case 0.1:
    case 0.2:
    case 1.1:
    case 1.2:
    case 2.3:
    case 2.4:
    case 3.3:
    case 3.4:
      return cubeIndexes.filter(item => (Math.floor(item / 9)) === (Math.floor(cubeIndex / 9)))
    case 0.3:
    case 0.4:
    case 1.3:
    case 1.4:
    case 4.3:
    case 4.4:
    case 5.3:
    case 5.4:
      return cubeIndexes.filter(item => Math.floor(item % 9 / 3) === Math.floor(cubeIndex % 9 / 3))
    case 2.1:
    case 2.2:
    case 3.1:
    case 3.2:
    case 4.1:
    case 4.2:
    case 5.1:
    case 5.2:
      return cubeIndexes.filter(item => (cubeIndex % 3) === (item % 3))
    default:
      return []
  }
}