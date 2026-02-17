import React, { useEffect, useState } from 'react';
import { Box, Stack, Heading, SimpleGrid, Button, HStack, Text } from '@chakra-ui/react';
import ExerciseCard from './ExerciseCard';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import Loader from "./Loader";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(9); // Increased to 9 for better grid layout

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);


  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" mt="50px" p="20px">
      <Heading
        as="h3"
        mb="46px"
        color="white"
        fontWeight="bold"
        textAlign="center"
        fontSize={{ base: '30px', lg: '44px' }}
      >
        Showing Results
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} justifyItems="center">
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </SimpleGrid>

      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <HStack spacing={4}>
            <Button
              onClick={() => paginate(currentPage - 1)}
              isDisabled={currentPage === 1}
              colorScheme="blue"
              variant="outline"
              _hover={{ bg: "whiteAlpha.200" }}
              color="white"
            >
              Previous
            </Button>
            <Text color="white" fontWeight="bold">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() => paginate(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              colorScheme="blue"
              variant="outline"
              _hover={{ bg: "whiteAlpha.200" }}
              color="white"
            >
              Next
            </Button>
          </HStack>
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
