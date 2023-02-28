/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'mainColor': "#FF7A50",
          black: {
            'primary': "#363853"
          }
        }
      },
      backgroundImage: {
        'bg-lienar': "linear-gradient(113.59deg, rgba(239, 239, 239, 0) -2.01%, rgba(239, 239, 239, 0.2) 103.74%)"
      },
      gap: {
        "15": "60px"
      },
      fontFamily: {
        'rubik': "'Rubik', sans-serif"
      },
      fontSize: {
        "6.5xl": ["66px", "78px"]
      },
      boxShadow: {
        "btn-shadow": "0px 22px 40px rgba(255, 104, 56, 0.19)"
      }
    },
  },
 
  plugins: [],
}
