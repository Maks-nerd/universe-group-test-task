import type {Config} from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': {opacity: '0'},
					'100%': {opacity: '1'},
				},
				fadeOut: {
					'0%': {opacity: '1'},
					'100%': {opacity: '0'},
				},
			},
			animation: {
				fadeIn: 'fadeIn 0.3s forwards',
				fadeOut: 'fadeOut 0.3s forwards',
			},
			colors: {
				primary: '#001f82',
				background: '#F3F4F6',
				card: '#FFFFFF',
				borderColor: '#E5E7EB',
			},
		},
	},
	plugins: [],
};

export default config;
