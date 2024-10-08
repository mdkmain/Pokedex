/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			PokemonGb: ['PokemonGb', 'ui-sans-serif']
		},
		extend: {
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-5deg)' },
					'50%': { transform: 'rotate(5deg)' }
				}
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite'
			}
		}
	},
	plugins: []
};
