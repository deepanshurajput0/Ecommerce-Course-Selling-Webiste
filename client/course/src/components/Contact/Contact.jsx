import {
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    Textarea,
    VStack,
  } from '@chakra-ui/react';
  import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
  import { Link } from 'react-router-dom';
import { ContactUs } from '../../redux/actions/others';
import toast from 'react-hot-toast';
  const Contact = () => {
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    const [message, setMessage]=useState('')
    const dispatch = useDispatch()
    const { loading, error, message:stateMessage } = useSelector(state=>state.other)
    const submitHandler =(e)=>{
      e.preventDefault()
      dispatch(ContactUs(name,email,message))
    }

    useEffect(()=>{
      if(error && error.message){
        toast.error(error)
        dispatch({type:'clearError'})
      }
      if(stateMessage){
        toast.success(stateMessage)
        dispatch({type:'clearMessage'})
      }
    },[dispatch,stateMessage,error])
  
    return (
      <Container h="92vh" >
         <VStack h={"full"} justifyContent={"center"} spacing={"16"} >
          <Heading children="Contact Us" />
          <form style={{ width: '100%' }} onSubmit={submitHandler} >
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="Name" />
              <Input
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Abc"
                type={'text'}
                focusBorderColor="purple.500"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Email" />
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Abc@gmail.com"
                type={'email'}
                focusBorderColor="purple.500"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="message" children="Message" />
              <Textarea
                required
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Your Message..."
                focusBorderColor="purple.500"
              />
            </Box>
            <Box my={'4'}>
             
            </Box>
  
            <Button isLoading={loading} my={'4'} colorScheme="purple" type="submit">
              Send Mail 
            </Button>
            <Box>
              Request for a course? {''}
              <Link to="/request" >
                <Button colorScheme={"purple"} variant={"link"} >
                  Click
                </Button>
              </Link>
            </Box>
          </form>
         </VStack>
      </Container>
    )
  }
  
  export default Contact