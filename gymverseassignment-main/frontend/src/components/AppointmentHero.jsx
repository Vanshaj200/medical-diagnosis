import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

import doc from '../media/doctors-appointment-mental-health.png';
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const AppointmentHero = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleBooking = () => {
    if (isSignedIn) {
      navigate('/profile/home');
    } else {
      navigate('/login');
    }
  };

  const textAlign = useBreakpointValue({ base: 'center', md: 'left' });

  return (
    <Box
      minH="90vh"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      py={10}
    >
      {/* Background decoration elements could go here */}

      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        maxW="7xl"
        mx="auto"
        px={{ base: 6, md: 10 }}
        gap={{ base: 10, md: 20 }}
      >
        <Stack
          flex={1}
          spacing={8}
          textAlign={textAlign}
          justify="center"
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            as="h1"
            size="3xl"
            lineHeight="1.2"
            letterSpacing="tight"
            className="font-bold"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500">
              Book Your
            </span>
            <span className="block text-white">
              Appointment Today
            </span>
          </Heading>

          <Text fontSize={{ base: "lg", md: "xl" }} color="blue.100" maxW="lg" lineHeight="1.8">
            Discover the convenience of booking appointments online. Schedule your visit now and enjoy a hassle-free experience with our top-rated professionals.
          </Text>

          <Box>
            <Button
              size="lg"
              onClick={handleBooking}
              colorScheme="blue"
              bgGradient="linear(to-r, blue.500, blue.600)"
              _hover={{
                bgGradient: "linear(to-r, blue.600, blue.700)",
                boxShadow: "0 10px 20px -10px rgba(66, 153, 225, 0.5)",
                transform: "translateY(-2px)"
              }}
              px={10}
              py={7}
              fontSize="xl"
              rounded="full"
              fontWeight="bold"
              transition="all 0.3s"
            >
              Book Appointment
            </Button>
          </Box>
        </Stack>

        <Box
          flex={1}
          as={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          display="flex"
          justifyContent="center"
        >
          <div className="relative z-10">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full w-3/4 h-3/4 m-auto -z-10 animate-pulse"></div>
            <img
              src={doc}
              alt="Doctor Appointment"
              className="rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform duration-500 max-h-[500px] w-auto object-cover"
            />
          </div>
        </Box>
      </Flex>
    </Box>
  );
};

export default AppointmentHero;
