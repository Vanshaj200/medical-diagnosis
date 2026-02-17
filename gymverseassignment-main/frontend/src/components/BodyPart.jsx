import React from 'react';
import { Stack, Text, Image, Box } from '@chakra-ui/react';
import Icon from '../media/59f3c6f515f26d28b3da2b051c77ffa5.jpg';

const BodyPart = ({ item, setBodyPart, bodyPart }) => (
  <Stack
    as="button"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    bg={bodyPart === item ? 'gray.700' : 'gray.800'}
    borderBottomLeftRadius="20px"
    width="270px"
    height="282px"
    cursor="pointer"
    gap="47px"
    onClick={() => {
      setBodyPart(item);
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    }}
    _hover={{ transform: 'scale(1.05)', bg: 'gray.700' }}
    transition="all 0.3s ease"
    boxShadow="lg"
    border="1px"
    borderColor={bodyPart === item ? 'blue.500' : 'gray.700'}
  >
    <Image src={Icon} alt="dumbbell" width="100px" height="100px" borderRadius="full" objectFit="cover" />
    <Text fontSize="24px" fontWeight="bold" fontFamily="Poppins" color="white" textTransform="capitalize"> {item}</Text>
  </Stack>
);

export default BodyPart;