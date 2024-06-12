import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu2Fill, RiMenu2Line } from "react-icons/ri"
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../redux/actions/user'

const Header = ({isAuthenticated=false,user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const LinkButton =({url,title,onClose})=>{
        return <Link onClick={onClose} to={url} >
        <Button variant={'ghost'} >{title}</Button>
        </Link>
    }
   const logoutHandler =()=>{
     onClose()
     dispatch(logout())
   }
  return (
    <div style={{position:'absolute',left:"3%",top:"1%"}} >
        <Button onClick={onOpen} position={'fixed'} colorScheme='purple' width={'12'} height={'12'} rounded={'full'} >
            <RiMenu2Fill/>
        </Button>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth={'1px'} >
                    Course X
                </DrawerHeader>
                <DrawerBody>
                 <VStack spacing={'6'} alignItems={'flex-start'} >
                 <LinkButton onClose={onClose} url={'/'} title={'Home'} />
                 <LinkButton onClose={onClose} url={'/courses'} title={'Browse All Courses'} />
                 <LinkButton onClose={onClose} url={'/request'} title={'Request a Course'} />
                 <LinkButton onClose={onClose} url={'/contact'} title={'Contact Us'} />
                 <LinkButton onClose={onClose} url={'/about'} title={'About'} />
                 <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}  >
                  { isAuthenticated ? (<>
                    <VStack>
                        <HStack>
                        <Link onClick={onClose} to={'/profile'} >
                    <Button variant={'ghost'} colorScheme='purple' >Profile</Button>
                  </Link>
                    <Button onClick={logoutHandler} variant={'ghost'}> <RiLogoutBoxLine/> Logout</Button>
                        </HStack>
                        {
                    user && user.role==='admin' && <Link onClick={onClose} to='/admin/dashboard' >
                        <Button colorScheme='purple' variant={'ghost'} >
                            <RiDashboardFill/>
                            Dashboard
                        </Button>
                    </Link>
                 }
                    </VStack>
                  </>):(<>
                  <Link onClick={onClose} to={'/login'} >
                    <Button colorScheme={'purple'} >Login</Button>
                  </Link>
                  <p>OR</p>
                  <Link onClick={onClose} to={'/register'} >
                    <Button colorScheme={'purple'} >Sign Up</Button>
                  </Link>
                  </>)}
           
                 </HStack>
                
                 </VStack>
             
                </DrawerBody>
                
            </DrawerContent>
        </Drawer>
    </div>
  )
}

export default Header




