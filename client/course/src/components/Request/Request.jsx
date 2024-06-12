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
  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/others';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
  const Request = () => {
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    const [course, setCourse]=useState('')
    const dispatch = useDispatch()
    const { loading, error, message } = useSelector(state=>state.other)
    const submitHandler =(e)=>{
      e.preventDefault()
      dispatch(courseRequest(name,email,course))
    }

    
    useEffect(()=>{
      if(error && error.message){
        toast.error(error)
        dispatch({type:'clearError'})
      }
      if(message){
        toast.success(message)
        dispatch({type:'clearMessage'})
      }
    },[dispatch,message,error])
  

    return (
      <Container h="92vh" >
         <VStack h={"full"} justifyContent={"center"} spacing={"16"} >
          <Heading children="Request New Course" />
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
                focusBorderColor="purple"
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
                focusBorderColor="purple"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="message" children="Course" />
              <Textarea
                required
                id="course"
                value={course}
                onChange={e => setCourse(e.target.value)}
                placeholder="Explain the Course..."
                focusBorderColor="purple"
              />
            </Box>
            <Box my={'4'}>
             
            </Box>
  
            <Button my={'4'} colorScheme="purple" type="submit">
              Send Mail 
            </Button>
            <Box>
              See available Courses  {''}
              <Link to="/courses" >
                <Button isLoading={loading} colorScheme={"purple"} variant={"link"} >
                  Click
                </Button>
              </Link>
            </Box>
          </form>
         </VStack>
      </Container>
    )
  }

export default Request

