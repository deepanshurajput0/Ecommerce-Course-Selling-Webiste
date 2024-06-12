import { Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
     <VStack height={'100vh'} justifyContent={'center'} >
        <div>
            <Spinner thickness='2px' speed='0.65s'  emptyColor='transparent' size={'xl'} color='gray'/>
        </div>
     </VStack>
  )
}

export default Loader

