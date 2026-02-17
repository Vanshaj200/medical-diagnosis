import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../media/Virtual GymVerse.png';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Box,
  IconButton,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBooking = () => {
    if (isSignedIn) {
      navigate('/profile/home');
    } else {
      navigate('/login');
    }
  };

  const navClasses = `sticky top-0 z-50 transition-all duration-300 ${scrolled
    ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-2'
    : 'bg-transparent py-4'
    }`;

  // Button styles for consistency
  const navButtonStyle = {
    variant: 'ghost',
    color: 'white',
    _hover: { bg: 'whiteAlpha.200', transform: 'translateY(-2px)' },
    _active: { bg: 'whiteAlpha.300' },
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    fontWeight: '500',
    letterSpacing: '0.02em',
  };

  const menuListStyle = {
    bg: 'gray.800',
    borderColor: 'gray.700',
    boxShadow: 'xl',
    p: 2,
    rounded: 'xl',
  };

  const menuItemStyle = {
    bg: 'transparent',
    color: 'gray.100',
    _hover: { bg: 'blue.600', color: 'white' },
    rounded: 'md',
    mb: 1,
  };

  return (
    <Box as="nav" className={navClasses} width="100%">
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo */}
        <Link to={'/'} className="flex items-center gap-3 group">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-300 group-hover:rotate-12">
            <rect width="40" height="40" rx="12" fill="url(#logo_gradient)" />
            <path d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 20C30 14.4772 25.5228 10 20 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
            <defs>
              <linearGradient id="logo_gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          {!isMobile && (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-sans tracking-tight">
              OnlySolution
            </span>
          )}
        </Link>

        {/* Mobile Menu */}
        {isMobile ? (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              color="white"
              borderColor="whiteAlpha.400"
              _hover={{ bg: 'whiteAlpha.200', borderColor: 'white' }}
              _active={{ bg: 'whiteAlpha.300' }}
            />
            <MenuList {...menuListStyle}>
              {/* Mobile Menu Items */}
              <MenuItem as={Link} to="/fitness" {...menuItemStyle}>
                Virtual Gym
              </MenuItem>
              <MenuItem as={Link} to="/Tracker/dashboard" {...menuItemStyle}>
                Fitness Tracker
              </MenuItem>
              <MenuItem as={Link} to="/Bmi" {...menuItemStyle}>
                BMI Calculator
              </MenuItem>
              <MenuItem as={Link} to="/catch" {...menuItemStyle}>
                Free Fall
              </MenuItem>
              <MenuItem as={Link} to="/Memory" {...menuItemStyle}>
                Memory Games
              </MenuItem>
              <MenuItem as={Link} to="/Aibot" {...menuItemStyle}>
                AI Chatbot
              </MenuItem>
              <MenuItem as={Link} to="/Contact" {...menuItemStyle}>
                Contact Us
              </MenuItem>
              <MenuItem as={Link} to="/news" {...menuItemStyle}>
                News
              </MenuItem>

              <Divider my={2} borderColor="gray.600" />

              {/* User Auth Mobile */}
              <Box p="2" display="flex" justifyContent="center">
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="sm" colorScheme="blue" width="full">Sign In</Button>
                  </SignInButton>
                </SignedOut>
              </Box>
            </MenuList>
          </Menu>
        ) : (
          <Flex alignItems="center" gap="2">
            {/* Desktop Navigation */}
            <Button {...navButtonStyle} onClick={handleBooking}>
              Book Appointment
            </Button>

            <Menu>
              <MenuButton as={Button} {...navButtonStyle} rightIcon={<ChevronDownIcon />}>
                Fitness
              </MenuButton>
              <MenuList {...menuListStyle}>
                <MenuItem as={Link} to="/fitness" {...menuItemStyle}>
                  Virtual Gym
                </MenuItem>
                <MenuItem as={Link} to="/Tracker/dashboard" {...menuItemStyle}>
                  Fitness Tracker
                </MenuItem>
                <MenuItem as={Link} to="/Bmi" {...menuItemStyle}>
                  BMI Calculator
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} {...navButtonStyle} rightIcon={<ChevronDownIcon />}>
                Games
              </MenuButton>
              <MenuList {...menuListStyle}>
                <MenuItem as={Link} to="/catch" {...menuItemStyle}>
                  Free Fall
                </MenuItem>
                <MenuItem as={Link} to="/Memory" {...menuItemStyle}>
                  Memory Games
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} {...navButtonStyle} rightIcon={<ChevronDownIcon />}>
                AI Assistant
              </MenuButton>
              <MenuList {...menuListStyle}>
                <MenuItem as={Link} to="/Aibot" {...menuItemStyle}>
                  Chatbot
                </MenuItem>
              </MenuList>
            </Menu>

            <Button as={Link} to="/Contact" {...navButtonStyle}>
              Contact
            </Button>

            <Menu>
              <MenuButton as={Button} {...navButtonStyle} rightIcon={<ChevronDownIcon />}>
                More
              </MenuButton>
              <MenuList {...menuListStyle}>
                <MenuItem as={Link} to="/news" {...menuItemStyle}>
                  News
                </MenuItem>
              </MenuList>
            </Menu>

            {/* User Auth Desktop */}
            <Box ml={4}>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="solid"
                    px={6}
                    rounded="full"
                    boxShadow="0 4px 14px 0 rgba(0,118,255,0.39)"
                    _hover={{ transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(0,118,255,0.23)' }}
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
