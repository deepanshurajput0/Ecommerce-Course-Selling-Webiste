import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react"
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin'
import toast from 'react-hot-toast'
const Users = () => {
  const { users, loading, error, message } = useSelector(state=>state.admin)
  const dispatch = useDispatch()
  const updateHandler=(userId)=>{
    dispatch(updateUserRole(userId))
  }
  const deleteButtonHandler=(userId)=>{
    dispatch(deleteUser(userId))
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
   dispatch(getAllUsers())
  },[dispatch,error,message])
  return (
    <Grid height={"100vh"} display={["","flex"]} >

          <>
              <Box p={["0","16"]} overflowX={"auto"} width={"80%"}>
    <Heading 
    textTransform={"uppercase"}
     children="All Users"
     my={"16"}
     textAlign={['center','left']} 
    />
    <TableContainer w={['100vw','full']}  >
     <Table variant={'simple'} size={'lg'}  >
     <TableCaption>All Available users in the database</TableCaption>
     <Thead>
       <Tr>
        <Th>Id</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Role</Th>
        <Th>Subscription</Th>
        <Th isNumeric >Action</Th> 
       </Tr>
     </Thead>

     <Tbody>
    {
       users && users.map(item=>(
        <Row key={item._id} updateHandler={updateHandler} deleteButtonHandler={deleteButtonHandler} item={item} loading={loading} /> 
      ))
    }
     </Tbody>
     </Table>
    </TableContainer>
    </Box>
          </>

    <Sidebar />
  </Grid>

  )
}

export default Users

function Row({item, updateHandler, deleteButtonHandler,loading}){
  return(
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription && item.subscription.status ==="active"?"Active":"Not Active"}</Td>
      <Td isNumeric >
       <HStack justifyContent={"flex-end"}  >
         <Button onClick={()=>updateHandler(item._id)} variant={'outline'}>
           Change Role 
         </Button>
         <Button isLoading={loading} onClick={()=>deleteButtonHandler(item._id)} color={"purple.600"} >
          <RiDeleteBin7Fill/> 
         </Button>
       </HStack>
      </Td>
    </Tr>
  )
}
