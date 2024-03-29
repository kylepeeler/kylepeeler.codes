const { spacing } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important: true,
  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx'], // paths to all of my pages and components mso Tailwind can tree-shake unused styles in production builds
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      green: colors.lime,
      blue: colors.cyan,
      purple: colors.violet
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        extend: {
          spacing: {
            128: '32rem',
            144: '36rem'
          },
          borderRadius: {
            '4xl': '2rem'
          }
        }
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-10deg)'
          },
          '50%': {
            transform: 'rotate(10deg)'
          }
        }
      },
      cursor: {
        hand: 'grab'
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out 2s',
        wiggleinf: 'wiggle 1s ease-in-out infinite'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.green.500'),
              '&:hover': {
                color: theme('colors.green.700')
              },
              code: { color: theme('colors.green.400') }
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32]
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.green.400'),
              '&:hover': {
                color: theme('colors.green.600')
              },
              code: { color: theme('colors.green.400') }
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32]
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') }
              }
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') }
              }
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700')
              }
            }
          }
        }
      })
    }
  },
  variants: {
    typography: ['dark'],
    extend: {
      animation: ['hover', 'focus'],
      ringWidth: ['hover'],
      ringColor: ['hover']
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
