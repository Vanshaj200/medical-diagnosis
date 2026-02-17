import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Box, FormControl, FormLabel, Input, Textarea, Button, Heading, Text, Flex, Container, VStack, useToast } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

export default function Contact() {
  const [state, handleSubmit] = useForm("xrbzzdzn");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  if (state.succeeded) {
    return (
      <Box minH="100vh" bg="gray.900" color="white">
        <Navbar />
        <Flex align="center" justify="center" h="80vh">
          <Box textAlign="center" p={8} bg="gray.800" rounded="xl" shadow="xl" border="1px" borderColor="gray.700">
            <Heading color="green.400" mb={4}>Message Sent!</Heading>
            <Text fontSize="lg" color="gray.300">Thanks for reaching out! We will get back to you soon.</Text>
            <Button mt={6} colorScheme="blue" onClick={() => window.location.reload()}>Send Another</Button>
          </Box>
        </Flex>
      </Box>
    );
  }

  const inputStyle = {
    bg: "gray.700",
    border: "1px solid",
    borderColor: "gray.600",
    _hover: { borderColor: "blue.400" },
    _focus: { borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" },
    color: "white"
  };

  const labelStyle = {
    color: "gray.300",
    fontWeight: "bold",
    fontSize: "sm",
    mb: 1
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-b, gray.900, gray.800)" color="white">
      <Navbar />
      <Container maxW="3xl" py={20}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4} bgClip="text" bgGradient="linear(to-r, blue.400, purple.500)">
              Get in Touch
            </Heading>
            <Text fontSize="xl" color="gray.400">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>
          </Box>

          <Box
            bg="gray.800"
            p={{ base: 6, md: 10 }}
            borderRadius="2xl"
            shadow="2xl"
            border="1px"
            borderColor="gray.700"
            backdropFilter="blur(10px)"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel htmlFor="name" {...labelStyle}>Full Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    {...inputStyle}
                    size="lg"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-sm mt-1" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="email" {...labelStyle}>Email Address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    {...inputStyle}
                    size="lg"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="phone" {...labelStyle}>Phone Number</FormLabel>
                  <Flex>
                    <Box
                      px={3}
                      display="flex"
                      alignItems="center"
                      bg="gray.700"
                      border="1px solid"
                      borderColor="gray.600"
                      borderRight="none"
                      borderLeftRadius="md"
                      color="gray.400"
                    >
                      +91
                    </Box>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      {...inputStyle}
                      borderLeftRadius={0}
                      size="lg"
                    />
                  </Flex>
                  <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-400 text-sm mt-1" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="message" {...labelStyle}>Message</FormLabel>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    {...inputStyle}
                    size="lg"
                    rows={5}
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1" />
                </FormControl>

                <Button
                  type="submit"
                  isDisabled={state.submitting}
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  mt={4}
                  bgGradient="linear(to-r, blue.500, blue.600)"
                  _hover={{ bgGradient: "linear(to-r, blue.600, blue.700)", transform: 'translateY(-2px)', shadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
