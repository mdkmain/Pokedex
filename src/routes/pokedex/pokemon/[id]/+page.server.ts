import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
	}

	const pokemon = await response.json();

	const flavourTextResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`);

	let flavour;
	if (!flavourTextResponse.ok) {
		flavour = [];
	} else {
		flavour = await flavourTextResponse.json();
	}

	return {
		pokemon,
		flavour
	};
};
