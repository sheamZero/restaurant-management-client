/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        btnHover: "var(--btnHover)",
        backgroundcolor: "var(--backgroundcolor)",
        backgroundcolorwhite: "var(--backgroundcolorwhite)",
      },
    },
  },
  plugins: [require("daisyui")],
};
