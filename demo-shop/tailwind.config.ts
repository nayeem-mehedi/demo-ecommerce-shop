/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'light': {
           'primary' : '#570df8',
           'primary-focus' : '#4506cb',
           'primary-content' : '#ffffff',

           'secondary' : '#f000b8',
           'secondary-focus' : '#bd0091',
           'secondary-content' : '#ffffff',

           'accent' : '#37cdbe',
           'accent-focus' : '#2ba69a',
           'accent-content' : '#ffffff',

           'neutral' : '#3b424e',
           'neutral-focus' : '#2a2e37',
           'neutral-content' : '#ffffff',

           'base-100' : '#ffffff',
           'base-200' : '#f9fafb',
           'base-300' : '#ced3d9',
           'base-content' : '#1e2734',

           'info' : '#1c92f2',
           'success' : '#009485',
           'warning' : '#ff9900',
           'error' : '#ff5724',

          '--rounded-box': '1rem',          
          '--rounded-btn': '.5rem',        
          '--rounded-badge': '1.9rem',      

          '--animation-btn': '.25s',       
          '--animation-input': '.2s',       

          '--btn-text-case': 'uppercase',   
          '--navbar-padding': '.5rem',      
          '--border-btn': '1px',            
        },
      },
    ],
  },
};
