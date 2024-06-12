import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Box, Button, Container, Grid, Heading, Input, Select, VStack,Image} from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { createCourse } from '../../../redux/actions/admin'
const CreateCourse = () => {
  const [title, setTitle]=useState("")
  const [description,setDescription] = useState("")
  const [createdBy,setCreatedBy] = useState("")
  const [category,setCategory] = useState("")
  const [image,setImage] = useState("")
  const [imagePrev,setImagePrev] = useState("")
  const dispatch = useDispatch()
  const { loading, error, message } = useSelector(state=>state.admin)
  const categories = [
    'Web development',
    ' Artifical Intellegence',
    'Data Structure & Algorithms',
    'App Development',
    'Data Science',
    'Game Development'
  ]

  const changeImageHandler=(e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend =()=>{
        setImagePrev(reader.result)
        setImage(file)
    }
}
 const submitHandler =(e)=>{
  e.preventDefault()
  const myForm = new FormData()
  myForm.append('title',title)
  myForm.append('description', description)
  myForm.append('category', category)
  myForm.append('createdBy', createdBy)
  myForm.append('file', image);
  
  dispatch(createCourse(myForm))
  
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
 },[dispatch,error,message])
  return (
    <Grid height={"full"} display={["","flex"]} >
    <Container py={"16"} width={"80%"}>
     <form onSubmit={submitHandler} >

     <Heading textTransform={"uppercase"} children="Create Course" my={"16"} textAlign={["center","left"]} />
     <VStack m={"auto"} spacing={"8"} > 
     
     <Input value={title}
     onChange={e=>setTitle(e.target.value)}
     placeholder='Title'
     type='text'
     focusBorderColor='purple.300'
     />
     <Input value={description}
     onChange={e=>setDescription(e.target.value)}
     placeholder='Description'
     type='text'
     focusBorderColor='purple.300'
     />
     <Input value={createdBy}
     onChange={e=>setCreatedBy(e.target.value)}
     placeholder='Created'
     type='text'
     focusBorderColor='purple.300'
     />
     <Select focusBorderColor='purple.300' value={category} 
     onChange={e=>setCategory(e.target.value)}
     >
     <option value={""}> Category </option>
     {categories.map(item=>(
      <option key={item} value={item} > {item}</option>
     ))}
     </Select>
     <Input
              accept='image/*'
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
                onChange={changeImageHandler}
              />
              {imagePrev && (
                <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
              )}
            <Button isLoading={loading} w={"full"} colorScheme={"purple"} type='submit' >Create </Button>
     </VStack>
     </form>
    </Container>
    <Sidebar />
  </Grid>
    
  )
}

export default CreateCourse














// const CreateCourse = () => {
//   return (
//     <Grid minH={'100vh'} display={'flex'} justifyContent={'space-between'} templateColumns={['1fr','5fr','1fr']}  >
//         <Box></Box>
//       <Sidebar/>
//     </Grid>
//   )
// }

// export default CreateCourse


