import { Box, Grid, Heading, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import introVideo from "../../assets/videos/intro.mp4"
import { Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { getCourseLectures } from '../../redux/actions/course'
import Loader from '../layouts/Loader/Loader'
const CoursePage = ({user}) => {
    const [lectureNumber, setLectureNumber] = useState(0)
    console.log(lectureNumber)
    const dispatch = useDispatch()
    const { lectures, loading } = useSelector(state=>state?.course)

 const params = useParams()
useEffect(()=>{
    dispatch(getCourseLectures(params.id))
},[dispatch,params.id])

if(user.role!=='admin' && user.subscription===undefined || user.subscription.status!=='active'){
    return <Navigate to={'/subscribe'} />
}

  return (
    loading ? <Loader/> : (
        <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']} >
        {
            lectures && lectures.length>0 ? (
            <>
                            <Box>
                <video
                width={'100%'}
                autoPlay 
                controls 
                controlsList='nodownload  noremoteplayback'
                disablePictureInPicture
                // disableRemotePlayback
                src={lectures[lectureNumber].video.url} >
                </video>
         <>
           <Heading m="4" children={`#${lectureNumber+1} ${lectures[lectureNumber]?.title}`} />
           <Heading m="4" children="Description" />
           <Text m="4" size="xs" children={lectures[lectureNumber]?.description} />
         </>
       
            </Box>
            <VStack>
               {
                   lectures.map((element,index)=>(
                    <button 
                    key={element._id}
                    onClick={()=>setLectureNumber(index)}
                    style={{
                       width:"100%",
                       padding:"1rem",
                       textAlign:"center",
                       margin:0,
                       borderBottom: '1px solid rgba(0,0,0,0.2) '
                   }}
                    >
                       <Text noOfLines={1} >
                           #{index+1} {element.title}
                       </Text>
                    </button>
                   ))
               }
            </VStack>
            </>
            ) : <>
            <Heading textAlign={'center'} mt={'10rem'} children={'No lectures uploaded'} ></Heading>
            </>
        }
       </Grid>
    )
  )
}

export default CoursePage