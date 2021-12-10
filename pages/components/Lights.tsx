import {FC} from 'react';

const Lights: FC = () => {
  return (
    <>
      <ambientLight color='0x404040' intensity={0.5} />
    </>
  )
}

export default Lights