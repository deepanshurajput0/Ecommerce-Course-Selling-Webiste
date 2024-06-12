import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialYoutubeCircular, TiSocialInstagram} from "react-icons/ti"
import { DiGithub} from "react-icons/di"
const Footer = () => {
  return (
    <Box padding={"4"} bg={"blackAlpha.900"} minH={"10vh"} marginTop={'60px'} >
     <Stack direction={["column","row"]} >
      <VStack alignItems={["center","flex-start"]} width={"full"} >
      <Heading children="All Rights Reserved" color={"white"} />
      <Heading fontFamily={"body"} size={"sm"} children="@ Deepanshu Developer" color={"purple.400"} />
      </VStack>
      <HStack spacing={['2','10']} justifyContent="center"
      color={"white"}
      fontSize={"45"}
      >
      <a href="https://www.youtube.com" target='blank' >
        <TiSocialYoutubeCircular/>
      </a>
      <a href="https://www.instagram.com" target='blank' >
        <TiSocialInstagram/>
      </a>
      <a href="https://www.github.com" target='blank' >
        <DiGithub/>
      </a>
      </HStack>
     </Stack>
    </Box>
  )
}

export default Footer
