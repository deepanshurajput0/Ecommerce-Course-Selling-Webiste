import { Box, Container, Heading, VStack,Text, Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../redux/store'
import { buySubscription } from '../../redux/actions/user'
import toast from 'react-hot-toast'

const Subscribe = ({user}) => {
  const dispatch = useDispatch()
  const [key,setKey] = useState('')

  const { loading, error, subscriptionId } = useSelector(state=>state.subscription)
  const {  error:courseError } = useSelector(state=>state.course)

  const subscribeHandler = async() =>{
   const { data } = await axios.get(`${server}/razorpaykey`)
   setKey(data.key)
   dispatch(buySubscription())
  }
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(courseError){
      toast.error(courseError)
      dispatch({type:'clearError'})
    }
    if(subscriptionId){
      const openPopUp =()=>{
       const options = {
        key,
        amount: 29900, // amount in the smallest currency unit (in this case, paise)
        currency: "INR",
        name:"CourseX",
        description:'Get access to all premium content',
        subscription_id:subscriptionId,
        callback_url:`${server}/paymentverification`,
        prefill:{
          name:user.name,
          email:user.email,
          contact:''
        },
        notes:{
          address:'Tech XVerse'
        },
        theme:{
          color:'purple'
        }
       };
       const razor = new window.Razorpay(options)
       razor.open()
      }
      openPopUp()
    }
  },[dispatch,error,user.name,user.email,key,subscriptionId])
  return (
    <Container h="90vh" p="16" > 
      <Heading children="Welcome" my="8" textAlign={'center'} /> 
      <VStack boxShadow={'lg'} alignItems="stretch" borderRadius={'lg'} spacing={0} >
         <Box bg={"purple.400"} p={4} cs={{borderRadius:"8px 8px 0 0"}} >
            <Text color={'black'} children={'Pro Pack -₹299.00'} />
         </Box>
         <Box p={4}>
           <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'} >
            <Text children={'Join pro pack and get access to all content'} />
            <Heading size={'md'} children={'₹299.00 Only'} /> 
           </VStack>
           <Button isLoading={loading} onClick={subscribeHandler} my={'8'} w="full" colorScheme='purple' >
            Buy Now 
           </Button>
         </Box>

         <Box bg="blackAlpha.600" p="4" css={{borderRadius: '0 0 8px 8px '}}>
            <Heading size={'sm'} textTransform={'uppercase'} children={'100% refund at cancellation'} />          <Text fontSize={'xs'} children='Terms & Conditions Apply' /> 
         </Box>
      </VStack>
    </Container>
  )
}

export default Subscribe

