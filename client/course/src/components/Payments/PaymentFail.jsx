import {Container, Heading, VStack,Button } from '@chakra-ui/react';
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentFail = () => {
  return (
    <Container h={'90vh'} p='16' >
        <VStack justifyContent={'center'} h={'full'} spacing={'4'} >
          <RiErrorWarningFill size={'5rem'}/>
          <Heading>
            Payment Fail  
            </Heading>           
        <Link to="/subscribe">
          <Button varient={'ghost'} >Try Again</Button>
        </Link>
      </VStack>
    </Container>
  )
}

export default PaymentFail