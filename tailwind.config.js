const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0C3C4C',
        foreground: '#F3EFE6',
        gold: '#D6B16A',
        teal: '#5A7D89',
        darkgray: '#444444',
        lightcream: '#F3EFE6',
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        lora: ['"Lora"', 'serif']
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        beep: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' }
        },
        blink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' }
        },
        dotBlink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        rotate: 'rotate 2s linear infinite',
        beep: 'beep 1.5s ease-in-out infinite',
        blink: 'blink 1.2s ease-in-out infinite',
        'dot-1': 'dotBlink 1s ease-in-out infinite',
        'dot-2': 'dotBlink 1s ease-in-out infinite 0.2s',
        'dot-3': 'dotBlink 1s ease-in-out infinite 0.4s'
      },
      screens: {
        sm: '640px'
      }
    }
  },
  plugins: [nextui()],
  important: true
};
