/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-image": "url('/src/assets/main-bg-img.jpg')",
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1500px": "1500px",
        "800px": "800px",
        "700px":"700px",
        "400px": "400px",
        "300px": "300px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("daisyui")],
};
