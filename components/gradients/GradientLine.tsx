export const THEME_GRADIENT = `
bg-gradient-to-r from-red-600 via-purple-500 to-blue-400 dark:from-blue-300 dark:via-green-400 dark:to-yellow-500
`;

const GradientLine = () => (
  <div className={`sticky top-0 z-30 h-3 w-full ${THEME_GRADIENT}`} />
);

export default GradientLine;
