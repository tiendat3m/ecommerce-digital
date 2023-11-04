/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    listStyleType: {
      square: 'square',
    },
    extend: {
      width: {
        main: '1220px',
      },
      backgroundColor: {
        main: '#ee3131',
        overlay: 'rgba(0,0,0,0.3)',
        'overlay-1': 'rgba(0,0,0,0.1)'
      },
      textColor: {
        main: '#ee3131'
      },
      borderColor: {
        main: '#ee3131'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%',
      },
      gridTemplateRows: {
        // Simple 16 Row grid
        '10': 'repeat(10, minmax(0, 1fr))',

        // Complex site-specific Row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(40px);',
            transform: 'translateY(20px);'
          },
          '100%': {
            ' -webkit-transform': 'translateY(0);',
            transform: 'translateY(0);'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(40px);',
            transform: 'translateX(40px);'
          },
          '100%': {
            ' -webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(0px);',
            transform: 'translateX(0px);'
          },
          '100%': {
            ' -webkit-transform': 'translateX(400px);',
            transform: 'translateX(400px);'
          }
        },
        'slide-top-sm': {
          '0%': {
            '-webkit-transform': 'translateY(4px);',
            transform: 'translateY(4px);'
          },
          '100%': {
            ' -webkit-transform': 'translateY(0);',
            transform: 'translateY(0);'
          }
        },

      },
      animation: {
        'slide-top': 'slide-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-right': 'slide-right 0.9s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top-sm': 'slide-top 0.3s linear both;',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("@tailwindcss/forms")({
      strategy: 'class', // only generate classes
    })
  ],
}