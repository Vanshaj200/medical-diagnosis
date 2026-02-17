import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Box, Flex, VStack, List, ListItem, Button, useDisclosure, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Text, useColorModeValue } from '@chakra-ui/react';
import { SignOutButton } from '@clerk/clerk-react';
import Activity from './Activity';

import Navbar from '../components/Navbar';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useUser, useAuth } from '@clerk/clerk-react';
import { userProfile } from '../utils/fetchData'
import Dashboard from './Dashboard';
import Goals from './Goals';
import Workout from './Workout';

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser()
  const { getToken } = useAuth()
  const [userProfileData, setUserProfile] = useState('')
  const [score, setScore] = useState(0)
  const location = useLocation();

  useEffect(() => {


    const consoleToken = async () => {
      const token = await getToken()
      const data = await userProfile(token, user?.id)

      setScore(data?.score)


      if (data?.isAdmin === true) {
        setUserProfile('Admin')
      } else if (data?.isDoctor === true) {
        setUserProfile('Doctor')
      } else {
        setUserProfile('User')
      }
    }



    consoleToken();
  }, [getToken, user?.id, user?.publicMetadata.role])

  const sidebarBg = "gray.900";
  const activeLinkBg = "blue.600";
  const hoverLinkBg = "whiteAlpha.200";

  const SidebarContent = () => (
    <Box h="full">
      <Box textAlign="center" p={6} mb={6} bg="gray.800" borderRadius="xl" boxShadow="lg" border="1px" borderColor="gray.700">
        <Text color="gray.300" fontSize="sm" fontWeight="medium" mb={1}>
          Current Role
        </Text>
        <Text color="white" fontSize="xl" fontWeight="bold" bgClip="text" bgGradient="linear(to-r, blue.400, purple.500)">
          {userProfileData}
        </Text>
        <Box mt={4} p={3} bgGradient="linear(to-r, green.500, green.600)" borderRadius="lg" boxShadow="md">
          <Text color="white" fontSize="lg" fontWeight="bold">
            {score} Points
          </Text>
        </Box>
      </Box>

      <VStack align="stretch" spacing={3}>
        {[
          { name: 'Dashboard', path: 'dashboard' },
          { name: 'Workout', path: 'workout' },
          { name: 'Goals', path: 'goals' },
          { name: 'Activity', path: 'activity' },
        ].map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link key={item.name} to={item.path} style={{ width: '100%' }}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                w="full"
                color={isActive ? "white" : "gray.400"}
                bg={isActive ? activeLinkBg : "transparent"}
                _hover={{ bg: isActive ? "blue.700" : hoverLinkBg, color: "white" }}
                fontSize="md"
                h={12}
                px={6}
                borderRadius="lg"
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
        <Box pt={4}>
          <SignOutButton>
            <Button
              w="full"
              variant="outline"
              colorScheme="red"
              color="red.300"
              borderColor="red.500"
              _hover={{ bg: "red.500", color: "white" }}
              h={12}
            >
              Sign Out
            </Button>
          </SignOutButton>
        </Box>
      </VStack>
    </Box>
  );

  return (
    <Box bg="gray.900" minH="100vh" className="font-sans">
      <Navbar />
      <Flex direction="row" bg="gray.900" borderTop="1px" borderColor="gray.800">
        <Box
          display={{ base: 'none', md: 'block' }} // Hide on mobile
          w="64"
          bg="gray.900"
          borderRight="1px"
          borderColor="gray.800"
          p="6"
          minH="calc(100vh - 80px)" // Adjust based on navbar height
        >
          <SidebarContent />
        </Box>

        <Box
          display={{ base: 'block', md: 'none' }} // Show on mobile
          p="4"
          bg="gray.900"
          borderRight="1px"
          borderColor="gray.800"
          minH="calc(100vh - 80px)"
        >
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="outline"
            color="white"
            borderColor="gray.600"
            _hover={{ bg: "whiteAlpha.200" }}
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
          >
            <DrawerOverlay backdropFilter="blur(5px)" />
            <DrawerContent bg="gray.900" color="white" borderRight="1px" borderColor="gray.700">
              <DrawerCloseButton color="white" />
              <DrawerHeader borderBottom="1px" borderColor="gray.800">Menu</DrawerHeader>
              <DrawerBody p={6}>
                <SidebarContent />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        <Box flex="1" p={{ base: 4, md: 8 }} maxH="calc(100vh - 80px)" overflowY="auto" bg="gray.900">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workout" element={<Workout />} />
            <Route path="activity" element={<Activity />} />
            <Route path="goals" element={<Goals />} />
            {/* <Route path="addCategory" element={<AddCategory />} />
            <Route path="categories" element={<Categories />} /> */}
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
