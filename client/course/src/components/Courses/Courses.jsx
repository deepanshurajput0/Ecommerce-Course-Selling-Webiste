import { Button, Container, HStack, Heading, Input, Stack, Text, VStack, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './../home.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToPlaylist, getAllCourses } from '../../redux/actions/course';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loadUser } from '../../redux/actions/user';

const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount, loading }) => {
  return (
    <VStack className='course' alignItems={["center", "flex-start"]}>
      <Image className='course' src={imageSrc} boxSize="60" objectFit={"contain"} />
      <Heading
        textAlign={["center", "left"]}
        maxW="200px"
        size={'sm'}
        fontFamily={"sans-serif"}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text fontWeight={"bold"}
          children={"Creator"}
          textTransform="uppercase"
        />
        <Text fontFamily={"body"}
          children={creator}
          textTransform="uppercase"
        />
      </HStack>
      <Heading textAlign={"center"} size='xs' children={`lectures - ${lectureCount}`}
        textTransform={"uppercase"}
      />
      <Heading textAlign={"center"} size='xs' children={`Views - ${views}`}
        textTransform={"uppercase"}
      />
      <Stack direction={['column', 'row']} alignItems={"center"}>
        <Link to={`/course/${id}`}>
          <Button colorScheme='purple'>
            Watch Now
          </Button>
        </Link>
        <Button isLoading={loading} variant={"ghost"} colorScheme='purple' onClick={() => addToPlaylistHandler(id)}>
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  )
}

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    "Web development",
    "Artificial Intelligence",
    "Data Structures & Algorithm",
    "App Development",
    "Data Science",
    "Game Development"
  ];

  const { loading, courses = [], error, message } = useSelector(state => state.course);
  const dispatch = useDispatch();

  const addToPlaylistHandler = async (courseId) => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (error && error.message) {
      toast.error(error.message);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children='All Courses' m={"8"} />
      <Input value={keyword} onChange={e => setKeyword(e.target.value)}
        placeholder='Search a Course...' type={"text"}
        focusBorderColor='white'
      />
      <HStack overflowX={"auto"} paddingY={"8"} css={{ "&::-webkit-scrollbar": {
        display: "none",
      } }}>
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack direction={["column", "row"]}
        flexWrap="wrap"
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
      >
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((item) => (
            <Course
              key={item._id}
              title={item?.title}
              description={item?.description}
              views={item?.views}
              imageSrc={item?.poster?.url}
              id={item?._id}
              creator={item?.createdBy}
              lectureCount={item?.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading mt={'10rem'} children={'Courses Not Found'} />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
