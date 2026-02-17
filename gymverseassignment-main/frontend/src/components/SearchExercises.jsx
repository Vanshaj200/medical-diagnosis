import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      try {
        const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        console.log("Fetched Data: ", exercisesData);

        const searchedExercises = exercisesData.filter(
          (item) => item.name.toLowerCase().includes(search)
            || item.target.toLowerCase().includes(search)
            || item.equipment.toLowerCase().includes(search)
            || item.bodyPart.toLowerCase().includes(search),
        );

        console.log("Filtered Exercises: ", searchedExercises);

        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
        setSearch('');
        setExercises(searchedExercises);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Heading
        as="h2"
        fontWeight={700}
        fontSize={{ base: '30px', lg: '44px' }}
        mb="49px"
        textAlign="center"
        color="white"
      >
        Awesome Exercises You <br /> Should Know
      </Heading>
      <Box position="relative" mb="72px" w={{ base: '100%', lg: '70%' }}>
        <InputGroup size="lg">
          <Input
            height="56px"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises"
            type="text"
            bg="gray.800"
            color="white"
            borderColor="gray.700"
            _placeholder={{ color: 'gray.500' }}
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
            borderRadius="full"
            pr="180px"  // Space for the button if absolutely positioned, or just padding
          />
          <InputRightElement width={{ base: '80px', lg: '175px' }} height="100%" p={1}>
            <Button
              onClick={handleSearch}
              colorScheme="blue"
              size="lg"
              height="100%"
              width="100%"
              borderRadius="full"
              bgGradient="linear(to-r, blue.500, blue.600)"
              _hover={{ bgGradient: "linear(to-r, blue.600, blue.700)" }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box position="relative" w="100%" p="20px">
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  );
};

export default SearchExercises;