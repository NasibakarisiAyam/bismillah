/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#ffffff',
					100: '#fefefe',
					200: '#fdfdfd',
					300: '#fcfcfc',
					400: '#fafafa',
					500: '#f8f8f8',
					600: '#f5f5f5',
					700: '#f0f0f0',
					800: '#e8e8e8',
					900: '#e0e0e0',
				},
				secondary: {
					50: '#fdf8f5',
					100: '#f9f0e8',
					200: '#f2e1d0',
					300: '#e8c9a8',
					400: '#dca878',
					500: '#c8956f',
					600: '#b8835a',
					700: '#9b6f4a',
					800: '#7d5c3e',
					900: '#664d35',
				},
				brown: {
					50: '#fdf8f5',
					100: '#f9f0e8',
					200: '#f2e1d0',
					300: '#e8c9a8',
					400: '#dca878',
					500: '#c8956f',
					600: '#b8835a',
					700: '#9b6f4a',
					800: '#7d5c3e',
					900: '#664d35',
				}
			}
		},
	},
	plugins: [],
};
