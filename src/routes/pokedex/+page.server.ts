import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';

// let data: {
// 	count: number;
// 	next: string;
// 	previous: string;
// 	results: [];
// };

export const _fetchAllPokemon = async (supabase: SupabaseClient) => {
	let allPokemon = [];
	let from = 0;
	let to = 999;
	let moreData = true;

	while (moreData) {
		const { data: pokemon, error } = await supabase
			.from('pokemon')
			.select('id,name')
			.order('id', { ascending: true })
			.range(from, to);

		if (error) throw new Error(error.message);

		if (pokemon.length === 0) {
			moreData = false;
		} else {
			allPokemon = [...allPokemon, ...pokemon];
			from += 1000;
			to += 1000;
		}
	}

	return allPokemon;
};

//load data
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	return {
		pokemon: await _fetchAllPokemon(supabase)
	};
};
