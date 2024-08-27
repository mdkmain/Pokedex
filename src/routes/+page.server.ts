import type { PageServerLoad } from './$types';
import { store } from '../stores';

let data: {
	count: number;
	next: string;
	previous: string;
	results: [];
};

//fetch pokemon (all?)
export const _fetchPokemon = async (offset: string, limit: string) => {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
	data = await res.json();

	return data.results;
};

export const _fetchAllPokemon = async () => {
	const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
	data = await res.json();

	store.setList(data.results);
}

//load data
export const load: PageServerLoad = async ({ url }) => {
	const offset = (url.searchParams.get('offset') as string) ?? '0';
	const limit = (url.searchParams.get('limit') as string) ?? '32';

	return {
		pokemon: await _fetchPokemon(offset, limit),
		navigation: {
			previous: data.previous,
			next: data.next,
			offset,
			limit
		}
	};
};
