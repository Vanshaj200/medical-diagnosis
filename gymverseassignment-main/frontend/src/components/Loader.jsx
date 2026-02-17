import React from 'react';
import { Stack, Text, Spinner, Center } from '@chakra-ui/react';

const Loader = () => (
  <Center width="100%" py={10}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
      <Spinner size="xl" color="blue.500" thickness='4px' />
      <Text color="gray.400" fontSize="lg">Loading...</Text>
    </Stack>
  </Center>
);

export default Loader;