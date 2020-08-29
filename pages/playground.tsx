import { Heading, Stack } from '@chakra-ui/core';

const Playground = () => {
  return (
    <Stack spacing={3}>
      <Heading as="h1" size="2xl">
        👋 Hey! I'm Kyle Peeler
      </Heading>
      <Heading as="h2" size="xl">
        👋 Hey! I'm Kyle Peeler
      </Heading>
      <Heading as="h3" size="lg">
        👋 Hey! I'm Kyle Peeler
      </Heading>
      <Heading as="h4" size="md">
        👋 Hey! I'm Kyle Peeler
      </Heading>
      <Heading as="h5" size="sm">
        👋 Hey! I'm Kyle Peeler
      </Heading>
      <Heading as="h6" size="xs">
        👋 Hey! I'm Kyle Peeler
      </Heading>
    </Stack>
  );
};

export default Playground;
