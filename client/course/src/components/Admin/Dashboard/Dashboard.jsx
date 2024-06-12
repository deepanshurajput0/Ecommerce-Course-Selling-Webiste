import { Box, Text,Grid, Heading, Stack,HStack, Progress} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import { DoughnutChart, LineChart } from './Chart'
import { useDispatch, useSelector } from "react-redux"
import { getDashboardStats } from '../../../redux/actions/admin'
import Loader from './../../layouts/Loader/Loader'

const Dashboard = () => {
 const dispatch = useDispatch()

 const { 
  loading, 
  stats,
  usersCount,
  subscriptionCount,
  viewsCount,
  usersPercentage,
  viewsPercentage,
  subscriptionPercentage,
  usersProfit,
  viewsProfit,
  subscriptionProfit } = useSelector(state=>state.admin)
  useEffect(()=>{
     dispatch(getDashboardStats())
  },[dispatch])
  
  const Databox =[
    {
       title:"Views",
       qty: viewsCount,
       qtyPercentage:viewsPercentage,
       profit: viewsProfit 
  },
    {
       title:"Users",
       qty: usersCount,
       qtyPercentage:usersPercentage,
       profit: usersProfit 
  },
    {
       title:"Subscription",
       qty: subscriptionCount,
       qtyPercentage:subscriptionPercentage,
       profit: subscriptionProfit 
  },


]

const Bar = [
  {
    title:"Views",
    value: viewsPercentage,
    profit:viewsProfit

  },{
    title:"Users",
    value:usersPercentage,
    profit:usersProfit,
  },{
    title:"Subscription",
    value:subscriptionPercentage,
    profit:subscriptionProfit
  }
]
  
  return(
    <Box height={"full"} w={"100%"} display={'flex'} alignItems={'center'} flexDirection={['column','row']} >
     {
      loading ? <Loader/> : (
        <Box 
        boxSizing='border-box'
        py={"16"}
        px={["4","0"]} 
        width={"80%"}>
  
  <Text mt={'10'}  textAlign="center" opacity={0.5} children={`Last change was on ${stats.length > 11 ? String(new Date(stats[11].createdAt)).split('G')[0] : ''} `} />

  
       <Heading children="Dashboard" ml={["0","16"]} mb={"16"} textAlign={['center','left']} />
       <Stack direction={['column','row']} minH="24"  justifyContent={['center','space-evenly']} >
        {
          Databox.map(item=>(
  
            <Box w={['full','20%']} p={"5"} boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}  borderRadius={"lg"}>
       <Text children={item.title} />
       <HStack spacing={"6"}>
        <Text fontSize={"2xl"} fontWeight={"bold"} children={item.qty} /> 
        <HStack>
        <Text children={`${item.qtyPercentage}%`} />
        {item.profit ? <RiArrowUpLine color='green' /> : <RiArrowDownLine color='red' />  }
        </HStack> 
       </HStack>
       <Text children={"Since Last Month"} />
      </Box>
          ))
        }
       </Stack>
       <Box m={['0',"16"]} borderRadius={"lg"} padding={['0','16']} mt={['4','16']} 
       boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'} 
       > 
       <Heading 
       textAlign={['center','left']} 
       size={'md'} 
       children="Views Graph " 
       pt={["8","0"]}
       ml={['0','16']}
       /> 
        <LineChart views={stats.map(item=>item.views)} />
       </Box>
       <Grid  justifyContent={"space-between"} templateColumns={['1fr','2fr','1fr']}>
        <Box p="4" >
          <Heading textAlign={['center','left']} 
          size={"md"} children="Progress Bar" my={"8"}
          ml={['0','16']}
          />
          <div >
          <Box flexDirection={['column','row']} > 
            {
              Bar.map(items=>(
                <Box  py={"4"} px={["0","20"]} > 
                <Heading size={"sm"} children={items.title} mb={"2"} />
                <HStack w={"full"} alignItems={"center"}  >
                 <Text children={items.profit?"0%": `-${items.value}%` }  />
                 <Progress w="full" value={items.profit?items.value:""} colorScheme='purple' />
                 <Text children={`${items.value>100?items.value:100}%`}  />
                 </HStack> 
               </Box>
              ))
              
            }
              <Box p={["0","16"]} boxSizing='border-box' py={"4"}>
          <Heading  textAlign={"center"} size={"md"} mb={"4"} children={"Users"} />
        <DoughnutChart users={[subscriptionCount, usersCount - subscriptionCount]} />
        </Box>
             </Box>
          </div>
           
        </Box>
       </Grid>
        </Box>
      )
     }

      <Sidebar />
    </Box>
  )

  
}



export default Dashboard
