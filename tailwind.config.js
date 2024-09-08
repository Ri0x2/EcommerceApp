/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      'Roboto': 'Roboto'
    },
    colors: {
      'Primary': '#FFFFFF',
      'Primary1': '#363738',
      'Secondary': '#F5F5F5',
      'Secondary1': '#FEFAF1',
      'BG': '#FFFFFF',
      'Text': '#FAFAFA',
      'Text1': '#7D8184',
      'Text2': '#000000',
      'Secondary2': '#DB4444',
      'Button1': '#00FF66',
      'Button2': '#DB4444',
      'HoverButton': '#E07575',
      'HoverButton 2': '#A0BCE0',
      'star' : '#FFAD33'
    },
    extend: {
      filter: {
        'invert-brightness': 'brightness(0) invert(1)',
      },
    },
  },
  plugins: [
     require('tailwindcss-filters'),

  ],
}

