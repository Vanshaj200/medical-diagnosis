import React from 'react';
import { Box, Heading, Text, Button, Link, useBreakpointValue, Flex, VStack, Image } from '@chakra-ui/react';
import { FaGamepad, FaCrown } from 'react-icons/fa';
import gam from "../photos/group-children-teacher-playing-rainbow-600nw-2039359091.webp"

const Games = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box py={10} px={4}>
      <Flex 
        direction={{ base: 'column', lg: 'row' }} 
        gap={8} 
        justify="center" 
        align="center"
        mt={{ base: 4, lg: 16 }}
        mb={8}
      >
        <Box 
          p={3} 
          borderRadius="xl" 
          shadow="lg"
          bg="whiteAlpha.100" // Semi-transparent dark background
          width={{ base: "full", lg: "auto" }}
        >
          <Image
            src={gam}
            alt="Game"
            borderRadius="xl"
            shadow="lg"
            maxW={{ base: "full", lg: "550px" }}
            objectFit="cover"
          />
        </Box>

        <Flex
          direction={'column'}
          align="center"
          justify="center"
          p={8}
          bg="whiteAlpha.100" // Semi-transparent dark background
          borderRadius="lg"
          boxShadow="lg"
          w={{ base: "full", lg: "auto" }}
          backdropFilter="blur(10px)"
        >
          <VStack
            spacing={6}
            textAlign="center"
            maxW="lg"
            p={6}
            bg="transparent"
            borderRadius="lg"
          >
            <Heading as="h1" size="2xl" color="blue.300" mb={4}>
              Let's Play Games!
            </Heading>
         
            <Text fontSize="lg" fontStyle="italic" color="gray.200" mb={6} >
              Discover our fun and exciting games designed to keep you entertained for hours. Choose your game and start playing now!
            </Text>
            <Flex direction={isMobile ? 'column' : 'row'} gap={4} align="center">
              <Link href="/Memory" isExternal>
                <Button
                  colorScheme="yellow"
                  size="lg"
                  borderRadius="full"
                  px={8}
                  py={4}
                  fontWeight="bold"
                  _hover={{ bg: 'yellow.500', transform: 'scale(1.05)' }}
                  transition="all 0.3s"
                  leftIcon={<FaGamepad />}
                  width={isMobile ? "full" : "auto"}
                >
                  Memory Game
                </Button>
              </Link>
              <Link href="/Catch" isExternal>
                <Button
                  colorScheme="teal"
                  size="lg"
                  borderRadius="full"
                  px={8}
                  py={4}
                  fontWeight="bold"
                  _hover={{ bg: 'teal.500', transform: 'scale(1.05)' }}
                  transition="all 0.3s"
                  leftIcon={<FaCrown />}
                  width={isMobile ? "full" : "auto"}
                >
                  Free Fall
                </Button>
              </Link>
           
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Games;
