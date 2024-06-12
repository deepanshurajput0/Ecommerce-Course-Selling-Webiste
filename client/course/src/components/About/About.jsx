import { Avatar, Container, Heading, Stack, VStack,Text, Link, Button, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import pic from "../../assets/images/pic.jpg"
import introVideo from "../../assets/videos/intro.mp4"
import {RiSecurePaymentFill} from "react-icons/ri"
const Founder =()=>{
  return(
    <Stack direction={["column","row"]} spacing={["4","16"]} padding={'8'} >

    <VStack >
      <Avatar  src={pic} boxSize={['40','40']} />
      <Text children="Co-Founder" opacity={0.7} />
    </VStack>

    <VStack justifyContent={"center"} alignItems={['center',"flex-start"]} >
      <Heading children="Deepanshu Verma" size={["md",'xl']} />
      <Text 
      textAlign={['center','left']}
      children={`Hi I am a full-stack developer and a teacher. Our mission is to provide 
      quality content at reasonable price 
      `} />
    </VStack>
    </Stack>
  )
}


const About = () => {
  return (
    <Container  maxW={"container.lg"} padding={"16"} boxShadow={'lg'} >
      <Heading children="About Us" textAlign={['center','left']}/>
      <Founder/> 
     
    <Stack m="8" direction={['column','row']} alignItems="center" >
      <Text fontFamily={'cursive'} m="8" textAlign={['center','left']}>
        We are a video streaming platform with some premium courses available only for premium users.
      </Text>
      <Link to="/subscribe" >
      <Button variant={"ghost"} colorScheme='purple'>
        Checkout Our Plan 
      </Button>
      </Link>
    </Stack>
    <Box>
       <video autoPlay 
        controls 
        controlsList='nodownload nofullscreen noremoteplayback'
        disablePictureInPicture
        // disableRemotePlayback
        src={introVideo} >
        </video>
  </Box>
  <Box ml={6}>
    <Heading size={"md"} children="Terms & Condition" textAlign={['center','left']} my="4" />
    <Text>
    1. Account Registration <br />

1.1. To purchase a course, you must create an account with us. <br />
1.2. You are responsible for maintaining the confidentiality of your account information, including your password. <br />
1.3. You agree to provide accurate, current, and complete information during the registration process. <br />
2. Course Enrollment and Access <br />

2.1. By enrolling in a course, you are granted a limited, non-exclusive, non-transferable license to access and view the course content for which you have paid all required fees. <br />
2.2. Course access is for your personal, non-commercial use only. <br />
3. Payments and Refunds <br />

3.1. All fees are payable in the currency specified at the time of purchase. <br />
3.2. Payment must be made in full before you are granted access to the course.<br />
3.3. We offer a [number]-day refund policy, subject to the following conditions:
- Refund requests must be made within [number] days of purchase.
- The course content must not have been significantly consumed (e.g., more than 20% of the course material).<br />
4. Intellectual Property<br />

4.1. All course materials, including text, graphics, logos, and videos, are the intellectual property of [Your Website Name] or its content suppliers.<br />
4.2. You may not reproduce, distribute, modify, create derivative works of, publicly display, or perform any of the content unless expressly authorized by us.
5. User Conduct<br />

5.1. You agree not to use the Website for any unlawful purpose. <br />
5.2. You must not harass, threaten, or defraud other users, or engage in any activity that <br />could damage, disable, overburden, or impair the Website. <br />
5.3. You may not use the Website to upload or transmit viruses, worms, or any other harmful code.
<br />

    </Text>
  </Box>
  
   <HStack my="4" p={4} >
    <RiSecurePaymentFill/> 
    <Heading size={"xs"}
    fontFamily="sans-serif"
    children={"Paymebt is secured by RazorPay "}
    textTransform={"uppercase"}
    /> 
   </HStack>
    </Container>
  )
}



export default About

