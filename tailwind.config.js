/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}', // ✅ include all files inside /src
    ],
    safelist: ['bg-fresh-lime'], // ✅ keep your custom class from being purged
    theme: {
        extend: {},
    },
    plugins: [],
};
