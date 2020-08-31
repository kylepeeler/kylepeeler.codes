import { Flex, Heading, Text, Button } from '@chakra-ui/core';
const Projects = () => (
  <Flex
    flexDirection="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    my={8}
  >
    <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
      Projects
    </Heading>
    <Text>
      🚧👷‍♂️ This section is under construction, but for now, check them out on my
      Github!
    </Text>
    <a href="https://github.com/kylepeeler">
      <Button mt={4}>View Github Profile →</Button>
    </a>
  </Flex>
);

export default Projects;
