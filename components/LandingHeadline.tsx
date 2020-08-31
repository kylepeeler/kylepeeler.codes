import { Flex, Heading, Text, useColorMode } from '@chakra-ui/core';
import GradientText from './GradientText';
const LandingHeadline = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.500',
    dark: 'gray.400'
  };
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Flex mb={2}>
        <Heading as="h1" size="2xl" letterSpacing="tight">
          Hey 👋,{' '}
          <Flex display={['block', 'inline']}>
            I'm
            <GradientText as="span" size="2xl" letterSpacing="tight">
              &nbsp;Kyle Peeler
            </GradientText>
          </Flex>
        </Heading>
      </Flex>
      <Text color={secondaryTextColor[colorMode]}>
        I am front-end software engineer living in Carmel, IN. I love building
        intuitive and beautiful user experiences for the web. I mostly work with
        Javascript & React. Welcome to my playground.
      </Text>
    </Flex>
  );
};

export default LandingHeadline;
