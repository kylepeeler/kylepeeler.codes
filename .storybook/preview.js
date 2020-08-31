import React from 'react';
import { GlobalStyles } from '../pages/_app.tsx';
import {
  ThemeProvider,
  ColorModeProvider,
} from '@chakra-ui/core';

import theme from '../styles/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
export const decorators = [(Story) => (
    <ThemeProvider theme={theme}>
      {/* @FUTURE: how can we not always start at light?.. */}
      <ColorModeProvider value={'light'}>
        <GlobalStyles>
          <Story />
        </GlobalStyles>
      </ColorModeProvider>
    </ThemeProvider>
)];