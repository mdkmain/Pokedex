import { writable } from 'svelte/store';

type Pokemon = {
	id: number;
	name: string;
};

export const store = writable<Pokemon[]>([]);

export const filteredStore = writable<Pokemon[]>([]);

export const firstLoad = writable(true);
