import React, { useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import Navbar from '../components/Navbar';

export default function Fitness() {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box minH="100vh" bgGradient="linear(to-b, gray.900, gray.800)" color="white">
      <Navbar />
      <Container maxW="container.xl" p={4}>
        <SearchExercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
        <Exercises
          setExercises={setExercises}
          exercises={exercises}
          bodyPart={bodyPart}
        />
      </Container>
    </Box>
  );
}

