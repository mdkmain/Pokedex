import { writable } from 'svelte/store';

const createPokeStore = () => {
	const { subscribe, set } = writable({});

	return {
		subscribe,
		setList: (list: []) => set(list)
	};
};

export const store = createPokeStore();
