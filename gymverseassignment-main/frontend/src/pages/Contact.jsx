import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Heading, Text, Flex, VStack, useColorModeValue } from '@chakra-ui/react';

export default function Contact() {
  const [state, handleSubmit] = useForm("xrbzzdzn");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  if (state.succeeded) {
    return (
      <Flex minH="80vh" align="center" justify="center" bg={bgColor}>
        <Box textAlign="center" p={8} bg={cardBg} borderRadius="xl" shadow="lg">
          <Heading size="lg" color="green.500" mb={4}>Message Sent!</Heading>
          <Text fontWeight="medium">Thanks for reaching out! We will get back to you soon.</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Box bgGradient="linear(to-br, gray.700, gray.900, gray.950)" minH="calc(100vh - 64px)" py={10}>
      <Flex justify="center" align="center" px={4}>
        <Box 
          w={{ base: "full", md: "50%", lg: "40%" }} 
          p={8} 
          bg="gray.800" 
          borderRadius="xl" 
          shadow="2xl"
          mt={10}
        >
          <Heading as="h1" size="xl" textAlign="center" mb={6} color="white">
            Contact Us
          </Heading>
          
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="name" color="gray.300">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  bg="gray.700"
                  color="white"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'gray.500' }}
                  _focus={{ borderColor: 'blue.500', bg: 'gray.700' }}
                  size="lg"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-sm mt-1" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="email" color="gray.300">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  bg="gray.700"
                  color="white"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'gray.500' }}
                  _focus={{ borderColor: 'blue.500', bg: 'gray.700' }}
                  size="lg"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="phone" color="gray.300">Phone Number</FormLabel>
                <Flex>
                  <Box 
                    px={3} 
                    py={2} 
                    border="1px" 
                    borderColor="gray.600" 
                    borderLeftRadius="md" 
                    bg="gray.700" 
                    color="gray.300" 
                    display="flex" 
                    alignItems="center"
                  >
                    +91
                  </Box>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    bg="gray.700"
                    color="white"
                    ml={-1}
                    borderLeftRadius={0}
                    borderRightRadius="md"
                    borderColor="gray.600"
                    _hover={{ borderColor: 'gray.500' }}
                    _focus={{ borderColor: 'blue.500', bg: 'gray.700' }}
                    size="lg"
                    zIndex={1}
                  />
                </Flex>
                <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-400 text-sm mt-1" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="message" color="gray.300">Message</FormLabel>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  bg="gray.700"
                  color="white"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'gray.500' }}
                  _focus={{ borderColor: 'blue.500', bg: 'gray.700' }}
                  size="lg"
                  rows={4}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1" />
              </FormControl>

              <Button 
                type="submit" 
                isDisabled={state.submitting} 
                colorScheme="blue" 
                width="full" 
                size="lg"
                mt={4}
                _hover={{ bg: 'blue.600' }}
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
