import styled from '@emotion/styled';

import { Heading } from '@chakra-ui/core';

const GradientText = styled(Heading)`
  background-image: var(--theme-gradient);
  background-size: 100%;
  background-clip: text;
  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

export default GradientText;
