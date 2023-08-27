  // tailwind.config.js
  module.exports = {
    purge: [],
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
     darkMode: false, // or 'media' or 'class'
     theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },  
      colors: {
        'white': '#fff',
        'black': '#000',
        'softred': 'hsl(10, 79%, 65%)',
        'cyan': 'hsl(186, 34%, 60%)',
        'dark-brown': 'hsl(25, 47%, 15%)',
        'medium-brown': 'hsl(28, 10%, 53%)',
        'cream': 'hsl(33, 100%, 98%)',
        'paleorange': 'hsl(27, 66%, 92%)'
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
       extend: {},
     },
     variants: {
       extend: {},
     },
     plugins: [],
   }