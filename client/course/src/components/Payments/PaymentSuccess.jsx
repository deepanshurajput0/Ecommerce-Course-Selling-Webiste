import { Box, Container, Heading, VStack,Text, Button } from '@chakra-ui/react';
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get('reference')
  
  return (
    <Container h={'90vh'} p='16' >
      <Heading my={'8'} textAlign={'center'} children='You have Pro Pack' />
      <VStack boxShadow={'lg'} pb={'16'} alignItems={'center'} borderRadius={'lg'} >
        <Box w={'full'} bg={'purple.400'} p='4' css={{borderRadius:"8px 8px 0 0"}} >
          <Text>
            Payment Success 
          </Text>
        </Box>
        <Box p="4" >
         <VStack  textAlign={'center'} px={'8'} mt="4" spacing={"4"} >
           <Text>
            Congratulations Now you're a pro member. You have access to premium
           </Text>
           <Heading size={'4xl'} >
            <RiCheckboxCircleFill/> 
           </Heading>
         </VStack>
        </Box>
        <Link to="/profile">
          <Button varient={'ghost'} > Go to Profile</Button>
        </Link>
        <Heading py={"8"} size={"xs"}>
          Reference : {reference}
        </Heading>
      </VStack>
    </Container>
  )
}

export default PaymentSuccess;