import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';



const Sidebar = () => {
  const location = useLocation();
  const Buttons = [
  
    {
      Icon: <RiDashboardFill  />,
      text: 'Dashboard',
      url: 'dashboard',
      active: location.pathname==="/admin/dashboard"
    },
    {
      Icon: <RiAddCircleFill />,
      text: 'Create Course',
      url: 'createcourse',
      active: location.pathname==="/admin/createcourse"
    },
    {
      Icon: <RiEyeFill />,
      text: 'Courses',
      url: 'courses',
      active:location.pathname==="/admin/courses"
    },
    {
      Icon: <RiUser3Fill />,
      text: 'Users',
      url: 'users',
      active:location.pathname==='/admin/users'
    },
  ];
  return (
    <VStack
      spacing={'8'}
      padding={'16'}
      position={['','absolute']}
      right={'1%'} 
      top={'1%'}
      height={'80%'}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    >
      {Buttons.map((item,i) => (
        <Link key={i} to={`/admin/${item.url}`}>
          <Button 
          fontSize={'larger'}
           variant={'ghost'} 
           style={{ margin: '4' }}
           colorScheme={
            item.active?"purple":""
           }
            
           >
            {item.Icon} {item.text}{' '}
          </Button>
        </Link>
      ))}
    </VStack>
  );
};

export default Sidebar;
