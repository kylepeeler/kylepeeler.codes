import React from 'react';
import { GlobalStyles } from '../pages/_app.tsx';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
export const decorators = [(Story) => (
  <GlobalStyles>
    <Story />
  </GlobalStyles>
)];