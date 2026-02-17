import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Button, useToast, Flex } from '@chakra-ui/react';

const Bmi = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('');
  const [bmiValue, setBmiValue] = useState(null);

  const calculateBMI = (event) => {
    event.preventDefault();

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      alert('Please enter valid positive numbers for height and weight.');
      return;
    }

    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
    setBmiValue(bmi);
    let resultText = `Your BMI is ${bmi}. `;
    let color = "blue.400";

    if (bmi < 18.5) {
      resultText += 'You are underweight.';
      color = "yellow.400";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      resultText += 'You have a normal weight.';
      color = "green.400";
    } else if (bmi >= 25 && bmi < 29.9) {
      resultText += 'You are overweight.';
      color = "orange.400";
    } else {
      resultText += 'You are obese.';
      color = "red.400";
    }

    setResult({ text: resultText, color });
  };

  const inputStyle = {
    bg: "gray.700",
    border: "1px solid",
    borderColor: "gray.600",
    _hover: { borderColor: "blue.400" },
    _focus: { borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" },
    color: "white",
    size: "lg"
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-b, gray.900, gray.800)" color="white">
      <Navbar />
      <Container maxW="container.md" py={20}>
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center" bgClip="text" bgGradient="linear(to-r, blue.400, purple.500)">
            BMI Calculator
          </Heading>
          <Text color="gray.400" textAlign="center" fontSize="lg">
            Calculate your Body Mass Index (BMI) to check if you're in a healthy weight range.
          </Text>

          <Box
            w="full"
            bg="gray.800"
            p={{ base: 6, md: 10 }}
            borderRadius="2xl"
            shadow="2xl"
            border="1px"
            borderColor="gray.700"
            backdropFilter="blur(10px)"
          >
            <form onSubmit={calculateBMI}>
              <VStack spacing={6}>
                <FormControl>
                  <FormLabel color="gray.300">Height (cm)</FormLabel>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
                    {...inputStyle}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.300">Weight (kg)</FormLabel>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 70"
                    {...inputStyle}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  bgGradient="linear(to-r, blue.500, blue.600)"
                  _hover={{ bgGradient: "linear(to-r, blue.600, blue.700)", transform: 'translateY(-2px)', shadow: 'lg' }}
                >
                  Calculate BMI
                </Button>
              </VStack>
            </form>

            {result && (
              <Box mt={8} p={6} bg="gray.700" rounded="xl" textAlign="center" borderLeft="4px solid" borderColor={result.color}>
                <Text fontSize="2xl" fontWeight="bold" color={result.color}>
                  BMI: {bmiValue}
                </Text>
                <Text fontSize="lg" color="white" mt={2}>
                  {result.text}
                </Text>
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Bmi;
