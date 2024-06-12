import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Image, Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure} from "@chakra-ui/react"
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin'
import toast from 'react-hot-toast'
const AdminCourses = () => {
  const dispatch = useDispatch()
  const { courses, lectures } = useSelector(state=>state.course)
  const { loading, error, message } = useSelector(state=>state.admin)
  const [courseId,setCourseId] = useState('')
  const [courseTitle,setCourseTitle] = useState('')
  const {isOpen,onClose, onOpen} = useDisclosure()
  const courseDetailHandler =(courseId,title)=>{
    dispatch(getCourseLectures(courseId))
    onOpen();
    setCourseId(courseId)
    setCourseTitle(title)
  }
  const deleteButtonHandler=(courseId)=>{
    dispatch(deleteCourse(courseId))
  }
  const deleteLectureButtonHandler=async(courseId,lectureId)=>{
    await dispatch(deleteLecture(courseId,lectureId))
    dispatch(getCourseLectures(courseId))
  }
  const addLectureHandler=async(e,courseId,title,description,video)=>{
    e.preventDefault(); 
    const myForm = new FormData()
    myForm.append('title',title)
    myForm.append('description', description)
    myForm.append('file', video);
    await dispatch(addLecture(courseId,myForm))
    dispatch(getCourseLectures(courseId))
  }

  useEffect(()=>{
    if(error && error.message){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message ){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }
     dispatch(getAllCourses())
  },[dispatch,message,error])

  return (
    <Grid height={"100vh"} display={["","flex"]} >
    <Box p={["0","18"]} overflowX={"auto"} width={"80%"}>
    <Heading 
    textTransform={"uppercase"}
     children="All Users"
     my={"16"}
     textAlign={['center','left']} 
    />
    <TableContainer w={['100vw','full']}  >
     <Table variant={'simple'} size={'lg'}  >
     <TableCaption>All Available Courses in the database</TableCaption>
     <Thead>
       <Tr>
        <Th>Id</Th>
        <Th>Poster</Th>
        <Th>Title</Th>
        <Th>Category</Th>
        <Th>Creator</Th>
        <Th isNumeric >Views</Th> 
        <Th isNumeric >Lectures</Th> 
        <Th isNumeric >Actions</Th> 
       </Tr>
     </Thead>

     <Tbody>
    {
      courses.map(item=>(
        <Row key={item._id} courseDetailHandler={courseDetailHandler} deleteButtonHandler={deleteButtonHandler} item={item} loading={loading} /> 
      ))
    }
     </Tbody>
     </Table>
    </TableContainer>
    <CourseModal isOpen={isOpen} onClose={onClose} deleteButtonHandler={deleteLectureButtonHandler}
    addLectureHandler={addLectureHandler} id={courseId} courseTitle={courseTitle} 
    lectures={lectures}
    loading={loading}
    />
    </Box>
    <Sidebar />
  </Grid>

  )
}

function Row({item, courseDetailHandler, deleteButtonHandler,loading}){
  return(
    <Tr>
      <Td>#{item._id}</Td>
      <Td><Image src={item.poster.url} /></Td>
      <Td>{item.title}</Td>
      <Td textTransform={"uppercase"} >{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric >{item.views}</Td>
      <Td isNumeric >{item.numOfVideos}</Td>

      
      <Td isNumeric >
       <HStack justifyContent={"flex-end"}  >
         <Button onClick={()=>courseDetailHandler(item._id,item.title)} variant={'outline'}>
           View Lectures 
         </Button>
         <Button isLoading={loading} onClick={()=>deleteButtonHandler(item._id)} color={"purple.600"} >
          <RiDeleteBin7Fill/> 
         </Button>
       </HStack>
      </Td>
    </Tr>
  )
}

export default AdminCourses; 
