// example theme.js
import { css } from '@emotion/core';
import { theme as chakraTheme } from '@chakra-ui/core';

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: '#2c2c2c'
  },
  fonts: {
    ...chakraTheme.fonts,
    heading: '"Proxima Nova", sans-serif',
    body: `"Nunito Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    mono: 'Menlo, monospace'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem'
  },
  gradients: {
    utils: {
      gradientText: css`
        background-image: linear-gradient(
          90deg,
          #0af5f4 7.81%,
          #adfe01 53.65%,
          #ffd706 100%
        );
      `
    }
  },
  breakpoints: ['425px', '768px', '1024px', '1440px']
};

export default theme;
