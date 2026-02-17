import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import gif from "../media/Animation - 1720638512048.json"
import giff from "../media/Animation - 1719504456561.json"
import News from './News';
import '../App.css';
import Fit from "./Fit"
import Card from '../components/Card';
import { Link, useNavigate } from 'react-router-dom';
import Games from './Games';
import { SimpleGrid, Box, Heading, Text, Button, useBreakpointValue, Flex, Spinner as Loader, Container, Stack } from '@chakra-ui/react';
import { useUser } from '@clerk/clerk-react';
import { useAuthStore } from '../context/store';
import AppointmentHero from '../components/AppointmentHero';
import Navbar from '../components/Navbar';
import yog from '../photos/depositphotos_85221854-stock-photo-group-of-happy-friends-exercising.jpg'
import bot from '../photos/1714394648414.jpg'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Section = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { setUser } = useAuthStore();
  const { user, isLoaded, isSignedIn } = useUser();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const handleBooking = () => {
    if (isSignedIn) {
      navigate('/Tracker/dashboard');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        setUser(user, user.publicMetadata?.role)
        if (user?.publicMetadata.role === "admin") {
          navigate('/admin-dashboard/inbox')
        }
      } else {
        localStorage.removeItem('userState');
      }
    }
  }, [isLoaded, user, navigate, setUser]);


  if (!isLoaded) {
    return (
      <Flex
        align="center"
        justify="center"
        h="100vh"
        bg="gray.900"
      >
        <Loader size="xl" color='blue.500' thickness='4px' />
      </Flex>
    );
  }

  return (
    <div className="App overflow-x-hidden bg-gray-900 text-white font-sans">
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900 min-h-screen">
        <Navbar />

        <AppointmentHero />

        {/* Fitness Tracker Section */}
        <Section>
          <Container maxW="7xl" py={{ base: 12, md: 24 }} px={{ base: 6, md: 10 }} id='fitnessTracker'>
            <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap={12}>
              <Box flex={1}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <img
                    src={yog}
                    className='relative rounded-3xl shadow-2xl w-full object-cover transform transition-transform duration-500 hover:scale-[1.01]'
                    alt="Fitness Tracker"
                  />
                </div>
              </Box>
              <Stack flex={1} spacing={6} textAlign={{ base: 'center', md: 'left' }}>
                <Heading as="h2" size="2xl" lineHeight="tight">
                  Elevate Your Fitness <br />
                  <span className="text-blue-400">With Advanced Tracking</span>
                </Heading>
                <Text fontSize="lg" color="gray.300" fontStyle="italic">
                  "Unlock your potential and achieve optimal fitness levels through cutting-edge data-driven tracking."
                </Text>
                <Flex gap={4} justify={{ base: 'center', md: 'flex-start' }} wrap="wrap">
                  <Button
                    size="lg"
                    colorScheme="blue"
                    onClick={handleBooking}
                    px={8}
                    rounded="full"
                    boxShadow="lg"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                  >
                    Go to Tracker
                  </Button>
                  <Link to="/Bmi">
                    <Button
                      size="lg"
                      variant="outline"
                      colorScheme="teal"
                      color="teal.200"
                      border="2px"
                      px={8}
                      rounded="full"
                      _hover={{ bg: 'whiteAlpha.100', transform: 'translateY(-2px)' }}
                    >
                      BMI Calculator
                    </Button>
                  </Link>
                </Flex>
              </Stack>
            </Flex>
          </Container>
        </Section>

        {/* Feature Cards Grid */}
        <Section>
          <Container maxW="7xl" py={16} px={6}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={8}
            >
              {[
                { title: "Games", text: "Explore fun and interactive games to stay active and engaged.", link: "#games", color: "purple.500" },
                { title: "Virtual Gym", text: "Access virtual gym sessions for personalized workouts.", link: "#virtualGym", color: "blue.500" },
                { title: "Fitness Tracker", text: "Track your fitness progress and set goals.", link: "#fitnessTracker", color: "teal.500" },
                { title: "AI Bot", text: "Interact with our AI bot for health advice.", link: "#chatBot", color: "pink.500" }
              ].map((card, index) => (
                <a href={card.link} key={index} className="block group">
                  <Box
                    bg="gray.800"
                    p={8}
                    rounded="2xl"
                    border="1px"
                    borderColor="gray.700"
                    transition="all 0.3s"
                    _hover={{ borderColor: card.color, transform: 'translateY(-5px)', boxShadow: 'xl' }}
                    height="100%"
                  >
                    <Heading size="md" mb={4} color={card.color}>{card.title}</Heading>
                    <Text color="gray.400">{card.text}</Text>
                  </Box>
                </a>
              ))}
            </SimpleGrid>
          </Container>
        </Section>

        <div id='virtualGym'>
          <Fit />
        </div>

        <div id='games'>
          <Games />
        </div>

        {/* AI Bot Section */}
        <Section>
          <Container maxW="7xl" py={24} px={6} id='chatBot'>
            <Box
              bg="gray.800"
              rounded="3xl"
              p={{ base: 8, md: 16 }}
              position="relative"
              overflow="hidden"
              boxShadow="2xl"
              border="1px"
              borderColor="gray.700"
            >
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

              <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={12} position="relative" zIndex={1}>
                <Box flex={1} textAlign={{ base: 'center', md: 'left' }}>
                  <Heading as="h2" size="xl" mb={6} bgClip="text" bgGradient="linear(to-r, blue.400, purple.500)">
                    AI-Driven Medical Consultations
                  </Heading>
                  <Text fontSize="lg" color="gray.300" mb={8} maxW="lg">
                    Get expert medical advice anytime, anywhere. Experience fast, reliable, and secure medical consultations powered by advanced AI.
                  </Text>
                  <Link to="/Aibot">
                    <Button
                      size="lg"
                      colorScheme="purple"
                      bgGradient="linear(to-r, blue.500, purple.600)"
                      _hover={{ bgGradient: "linear(to-r, blue.600, purple.700)", transform: 'scale(1.05)' }}
                      rounded="full"
                      px={8}
                      boxShadow="lg"
                    >
                      Chat with AI Bot
                    </Button>
                  </Link>
                </Box>
                <Box flex={1} display="flex" justifyContent="center">
                  <img src={bot} className='rounded-2xl shadow-2xl max-h-[400px] w-auto object-cover transform hover:rotate-2 transition-all duration-500' alt="AI Bot" />
                </Box>
              </Flex>
            </Box>
          </Container>
        </Section>

        <Container maxW="7xl" px={4} pb={10}>
          <News />
        </Container>

        {/* Footer */}
        <Box as="footer" bg="gray.950" py={12} borderTop="1px" borderColor="gray.800">
          <Container maxW="7xl" textAlign="center">
            <Text color="gray.500" mb={4}>&copy; OnlySolution. All rights reserved.</Text>
            <Flex justify="center" gap={6}>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/Contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
            </Flex>
          </Container>
        </Box>
      </div>
    </div>
  )
}
