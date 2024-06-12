import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom"
import { resetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
const ResetPassword = () => {
    const [password, setPassword]= useState("")
    const params = useParams()
    const navigate = useNavigate()
    const { loading, message, error } = useSelector(state=>state.profile)
    const dispatch = useDispatch()
    const submitHandler =(e)=>{
      e.preventDefault()
      dispatch(resetPassword(params.token,password))
      // navigate('/login')
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
          children="Reset Password"
          my="16"
        //   textTransform={'uppercase'}
          textAlign={['center','left']}
        />
        <VStack spacing={"8"} >
         <Input 
          required
          id='password'
          placeholder='New Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type={"password"}
          focusBorderColor='yellow.500'
         />
         <Button isLoading={loading} type='submit' w={'full'} colorScheme='purple' >
            Reset Password 
         </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
