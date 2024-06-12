import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const [email, setEmail]= useState("")
    const { loading, message, error } = useSelector(state=>state.profile)
    const dispatch = useDispatch()
    const submitHandler =(e)=>{
      e.preventDefault()
      dispatch(forgetPassword(email))
    }
    useEffect(() => {
      if (error && error.message) {
          toast.error(error.message);
          dispatch({ type: 'clearError' });
      }
      if (message) {
          toast.success(message);
          dispatch({ type: 'clearMessage' });
      }
  }, [dispatch, error, message]);


  return (
    <Container p={"16"} height={"95vh"} >
      <form onSubmit={submitHandler} >
        <Heading
          children="Forget Password"
          my="16"
        //   textTransform={'uppercase'}
          textAlign={['center','left']}
        />
        <VStack spacing={"8"} >
         <Input 
          required
          id='email'
          placeholder='Enter Gmail'
          value={email}
          onChange={e => setEmail(e.target.value)}
          type={"email"}
          focusBorderColor='yellow.500'
         />
         <Button isLoading={loading} type='submit' w={'full'} colorScheme='purple' >
            Send Reset Link 
         </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
