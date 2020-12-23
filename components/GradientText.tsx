import styled from '@emotion/styled';

const GradientText = styled.h1`
  background-image: var(--theme-gradient);
  background-size: 100%;
  background-clip: text;

  /* Use the text as a mask for the background. */

  /* This will show the gradient as a text color r
ather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  -webkit-filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1));
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1));

  &:hover {
    -webkit-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.16));
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.16));
    transition: filter 0.2s ease-in-out;
  }
`;

export default GradientText;
