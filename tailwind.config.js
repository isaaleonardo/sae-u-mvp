/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ucvBlue: '#1A2A4A',
                ucvGold: '#C9A03D',
                statusGreen: '#2ECC71',
                statusOrange: '#E67E22',
                statusRed: '#E74C3C',
                bgLight: '#F8F9FA'
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
            }
        },
    },
    plugins: [],
}