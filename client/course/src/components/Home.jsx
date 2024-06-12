import React from 'react'
import { Heading, Stack, VStack,Text, Button, Image, Box, HStack } from "@chakra-ui/react"
import './home.css'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { SiUdemy } from "react-icons/si";
import { CiYoutube } from "react-icons/ci";
import { TbBrandSublimeText } from "react-icons/tb";
import { TbBrandSlack } from "react-icons/tb";
import introVideo from './../assets/videos/intro.mp4'
const Home = () => {
  return (
    <section className='home' >
      <div className="container">
      <Stack direction={['column','row']} height='100%' justifyContent={['center','space-evenly']} alignItems={'center'} spacing={['16','56']}  >
      <VStack width={'full'} spacing={'6'}  >
          <Heading textAlign={['center','']} children='World Best Learning Platform for Students ' size={'2xl'} />
          <Text fontFamily={'cursive'} textAlign={['center','']} children="Build Your Career from Scratch to Success with Our Courses Lorem ipsum dolor sit amet consectetur adipisicing elit" />
          <Link to={'/courses'} >
            <Button size={'lg'} colorScheme='purple' >
              Explore Now
            </Button>
          </Link>
      </VStack>  
      </Stack>
      </div>
      <Box  >
         <Heading  textAlign={'center'}  mt={'10'} children='Our Brands' ></Heading>
         <HStack justifyContent={'space-evenly'} mt={'10'} >
          <FaGoogle  size={'30'}/>
          <CiYoutube size={'30'}/>
          <SiUdemy size={'30'}  />
          <TbBrandSlack size={'30'}/>
          <TbBrandSublimeText size={'30'}/>
         </HStack >
      </Box>
      <div className="container2">
        <video autoPlay controls src={introVideo} ></video>
      </div>
    </section>
  )
}

export default Home

