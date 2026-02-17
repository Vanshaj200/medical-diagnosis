import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button, VStack, FormControl, FormLabel, Flex, useColorModeValue } from '@chakra-ui/react';

const Bmi = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [bmiValue, setBmiValue] = useState(null);

  const calculateBMI = (event) => {
    event.preventDefault();

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (isNaN(heightInMeters) || isNaN(weightInKg)) {
      alert('Please enter valid numbers for height and weight.');
      return;
    }

    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
    setBmiValue(bmi);
    let resultText = `Your BMI is ${bmi}. `;

    if (bmi < 18.5) {
      resultText += 'You are underweight.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      resultText += 'You have a normal weight.';
    } else if (bmi >= 25 && bmi < 29.9) {
      resultText += 'You are overweight.';
    } else {
      resultText += 'You are obese.';
    }

    setResult(resultText);
  };

  const getResultColor = () => {
    if (!bmiValue) return "gray.800";
    if (bmiValue < 18.5) return "blue.500";
    if (bmiValue >= 18.5 && bmiValue < 24.9) return "green.500";
    if (bmiValue >= 25 && bmiValue < 29.9) return "orange.500";
    return "red.500";
  };

  // Consistent background with Home and Contact
  return (
    <Box bgGradient="linear(to-br, gray.700, gray.900, gray.950)" minH="calc(100vh - 64px)" py={10}>
      <Flex justify="center" align="center" px={4}>
        <Box 
          w={{ base: "full", md: "50%", lg: "40%" }} 
          p={8} 
          bg="gray.800" 
          borderRadius="xl" 
          shadow="2xl" 
          textAlign="center"
          mt={10}
        >
          <Heading as="h1" size="xl" color="blue.400" mb={6}>
            BMI Calculator
          </Heading>
          
          <form onSubmit={calculateBMI}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel htmlFor="height" color="gray.300">Height (cm)</FormLabel>
                <Input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  bg="gray.700"
                  color="white"
                  size="lg"
                  borderColor="gray.600"
                  _focus={{ borderColor: "blue.500", boxShadow: "outline", bg: "gray.700" }}
                  _hover={{ borderColor: "gray.500" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="weight" color="gray.300">Weight (kg)</FormLabel>
                <Input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  bg="gray.700"
                  color="white"
                  size="lg"
                  borderColor="gray.600"
                  _focus={{ borderColor: "blue.500", boxShadow: "outline", bg: "gray.700" }}
                  _hover={{ borderColor: "gray.500" }}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                mt={2}
                _hover={{ transform: 'scale(1.02)' }}
                transition="all 0.2s"
              >
                Calculate BMI
              </Button>
            </VStack>
          </form>

          {result && (
            <Box mt={6} p={4} bg="gray.700" borderRadius="md" borderLeft="4px" borderColor={getResultColor()} shadow="lg">
              <Text fontSize="lg" fontWeight="bold" color="white">
                {result}
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Bmi;
