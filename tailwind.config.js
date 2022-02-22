const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      slate: colors.slate,
      gray: colors.gray,
      white: colors.white,
      red: colors.red,
      green: colors.green,
      violet: colors.violet,
      purple: colors.purple,
      amber: colors.amber,
      indigo: colors.indigo,
      pink: colors.pink,
      cyan: colors.cyan,
      sky: colors.sky,
    },
    extend: {
      colors: {
        primary: '#5E17EB',
        secondary: '#FFBD59',
        tertiary: '#9A5AA9',
        neutral: '#373737',
      },

      fontFamily: {
        hind: ['Hind', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },

      backgroundImage: {
        signup:
          "url('https://res.cloudinary.com/dmcookpro/image/upload/v1645464492/git-dev/auth/gitdev-signup-bg.png')",
        signin:
          "url('https://res.cloudinary.com/dmcookpro/image/upload/v1645473690/git-dev/auth/gitdev-signin-bg.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
