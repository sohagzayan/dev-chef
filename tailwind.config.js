/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/features/**/*.{js,ts,jsx,tsx,mdx}',
        './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
        './src/infrastructure/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: ['bg-fresh-lime'], // ✅ keep your custom class from being purged
    theme: {
        extend: {},
    },
    plugins: [],
};
