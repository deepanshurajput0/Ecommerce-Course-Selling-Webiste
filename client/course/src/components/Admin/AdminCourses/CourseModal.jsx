import {Text, Box, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Button, VStack, Input, ModalFooter } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const CourseModal = ({isOpen,onClose,id, deleteButtonHandler,coursetitle, 
    addLectureHandler,lectures=[],loading}) => {
    const courseTitle = "React Course"
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [video,setVideo] = useState("")
    const [videoPrev,setVideoPrev] = useState("")
    const changeVideoHandler=(e)=>{
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onloadend =()=>{
          setVideoPrev(reader.result)
          setVideo(file)
      }
  }
  const handleClose =()=>{
    setTitle("")
    setDescription("")
    setVideo("")
    setVideoPrev("")
    onClose(); 
  }
  return (
    <Modal  isOpen={isOpen}  size={"full"} onClose={handleClose} scrollBehavior='outside' >
      <ModalOverlay/>
      <ModalContent  >
        <ModalHeader> {courseTitle} </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody  p={"16"} >
      <Grid width={["100%","70%"]} >
        <Box px={['0','16']} > 
        <Box my={"5"} >
         <Heading children={courseTitle} />
         <Heading children={`${id}`} size={"sm"} opacity={0.4} />
       </Box>
       <Heading children={"Lectures"} size={"lg"}  />
    
       {
        lectures.map((item,i)=>(
          <VideoCard key={i} 
          title={item.title} 
          description={item.description}
          num={i+1}
          lectureId={item._id}
          courseId={id}
          deleteButtonHandler={deleteButtonHandler}
          loading={loading}
          /> 
        ))
       }
       <Box display={"flex"} position={["","absolute","fixed"]}  top={["","4%"]} left={["","75%"]} px={["","5"]} >
         <form onSubmit={e=>addLectureHandler(e,id,title,description,video)} > 
          <VStack spacing={"4"}  >
           <Heading 
           children={"Add Lecture"} 
           size={"md"} 
           textTransform={"uppercase"}  
           
           />
           <Input 
           focusBorderColor='purple.300' 
           placeholder='title' 
           value={title} 
           onChange={(e)=>setTitle(e.target.value)}
           />
           <Input 
           focusBorderColor='purple.300' 
           placeholder='description' 
           value={description} 
           onChange={(e)=>setDescription(e.target.value)}
           />

<Input
              accept='video/*'
                required
                id="chooseAvatar"
                type={'file'}
                focusBorderColor="purple"
                css={{
                  "&::file-selector-button" : {
                    cursor:"pointer",
                    width:"110%",
                    padding:"0%",
                    height:"100%",
                    color:"purple", 
                  }
                }}
                onChange={changeVideoHandler}
              />
              {
                videoPrev && (
                  <video controlsList='nodownload' controls src={videoPrev} ></video>
                )
              }
              <Button colorScheme={"purple"} type='submit' isLoading={loading} > Upload </Button>
          </VStack>

           </form>

       </Box>
        </Box>
      </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} >CLose</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CourseModal

function VideoCard({title,description,num,lectureId,courseId,deleteButtonHandler,loading}){
    return <Stack direction={["column","row"]} my={"8"} borderRadius={"lg"} boxShadow={"0 0 10px rgba(107,70,193,0.5)"} justifyContent={["flex-start","space-between"]} padding={["4","8"]} >
      <Box> <Heading size={"sm"} children={`${num} ${title} `} />
      <Text children={description}  />
      </Box>
      <Button color={"purple.600"} isLoading={loading} onClick={()=>deleteButtonHandler(courseId,lectureId)} >
        <RiDeleteBin7Fill/> 
      </Button>
    </Stack>
}