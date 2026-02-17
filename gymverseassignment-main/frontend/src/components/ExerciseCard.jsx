import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Stack, Text, Image, HStack, Badge } from '@chakra-ui/react';

const ExerciseCard = ({ exercise }) => (
  <Link className="exercise-card" to={`/Fitness/exercise/${exercise.id}`}>
    <Box
      bg="gray.800"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
      maxW="350px"
    >
      <Image src={exercise.gifUrl} alt={exercise.name} loading="lazy" w="100%" h="auto" objectFit="cover" />
      <Box p={4}>
        <HStack spacing={3} mb={3}>
          <Badge
            px={3}
            py={1}
            borderRadius="full"
            colorScheme="red"
            bg="red.400"
            color="white"
            fontSize="xs"
            textTransform="capitalize"
          >
            {exercise.bodyPart}
          </Badge>
          <Badge
            px={3}
            py={1}
            borderRadius="full"
            colorScheme="yellow"
            bg="yellow.400"
            color="gray.800"
            fontSize="xs"
            textTransform="capitalize"
          >
            {exercise.target}
          </Badge>
        </HStack>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="white"
          textTransform="capitalize"
          noOfLines={1}
        >
          {exercise.name}
        </Text>
      </Box>
    </Box>
  </Link>
);

export default ExerciseCard;