module.exports = {
  purge: {
    enabled: false
  },
  theme: {
    colors: {
      cyan: {
        '100': '#E0FCFF',
        '200': '#87EAF2',
        '300': '#54D1DB',
        '400': '#38BEC9',
        '500': '#2CB1BC',
        '600': '#14919B',
        '700': '#0E7C86',
        '800': '#0A6C74',
        '900': '#044E54',
      },
      gray: {
        '50': '#F0F4F8',
        '100': '#D9E2EC',
        '200': '#BCCCDC',
        '300': '#9FB3C8',
        '400': '#829AB1',
        '500': '#627D98',
        '600': '#486581',
        '700': '#334E68',
        '800': '#243B53',
        '900': '#102A43',
      }
    },
    extend: {},
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'visited'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    backgroundColor: ['hover'],
  },
  plugins: [
    require('tailwindcss'), require('@tailwindcss/ui')
  ],
}
