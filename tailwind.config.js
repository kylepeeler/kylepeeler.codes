module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'], // paths to all of my pages and components so Tailwind can tree-shake unused styles in production builds
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
