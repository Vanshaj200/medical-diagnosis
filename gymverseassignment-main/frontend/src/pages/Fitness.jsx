import React, { useState } from 'react';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function Fitness() {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Link to="/">
        <Button 
          leftIcon={<ArrowBackIcon />} 
          colorScheme="blue" 
          variant="outline" 
          mt={4}
          mb={4}
        >
          Back to Home
        </Button>
      </Link>
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  );
}

