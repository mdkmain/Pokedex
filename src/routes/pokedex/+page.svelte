<script lang="ts">
	import PokemonCard from './PokemonCard.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { store, filteredStore, firstLoad } from '$lib/utils/stores';
	import { fade, blur } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let data: PageData;
	$: pokemon = data.pokemon;
	$: store.set(pokemon);
	$: filteredStore.set(pokemon);

	// $: offset = data.navigation.offset;
	// $: limit = data.navigation.limit;
	// $: getPokemonNumber = (i: number, offset: string) => {
	// 	let number = i + 1 + parseInt(offset);
	// 	let correctNumber;
	// 	number <= 1025 ? (correctNumber = number) : (correctNumber = number + 8975);
	// 	return correctNumber;
	// };
</script>

<div
	class="flex h-full w-full justify-center items-center"
	style="background-image: url('https://media.istockphoto.com/id/480628083/vector/abstract-background.jpg?s=612x612&w=0&k=20&c=6DKrFHq4of1yUi2dLIsLbJLdEI4AJ1GUvTL35G4Q9io=');"
>
	<button
		class="btn-primary my-auto"
		disabled={false}
		on:click={() => {
			// goto(`?offset=${parseInt(offset) - parseInt(limit)}&limit=${limit}`);
		}}>Previous</button
	>
	<div
		class="flex flex-wrap h-full w-full justify-center items-center"
		in:fade={{
			delay: $firstLoad ? 750 : 0,
			duration: $firstLoad ? 3000 : 750,
			easing: cubicInOut
		}}
		on:animationend={() => firstLoad.set(false)}
		out:blur={{
			delay: 0,
			duration: 400,
			easing: cubicInOut
		}}
	>
		{#if data}
			{#each $filteredStore as poke}
				<a href="/pokedex/pokemon/{poke.id}" class="h-fit w-fit m-2" draggable="false">
					<PokemonCard number={poke.id} name={poke.name} />
				</a>
			{/each}
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
	<button
		class="btn-primary my-auto"
		disabled={false}
		on:click={() => {
			// goto(`?offset=${parseInt(offset) + parseInt(limit)}&limit=${limit}`);
		}}>Next</button
	>
</div>
