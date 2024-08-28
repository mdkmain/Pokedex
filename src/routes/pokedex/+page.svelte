<script lang="ts">
	import PokemonCard from './PokemonCard.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { store } from '$lib/utils/stores';

	export let data: PageData;
	$: pokemon = data.pokemon;
	$: store.setList(pokemon);
	$: offset = data.navigation.offset;
	$: limit = data.navigation.limit;
	$: getPokemonNumber = (i: number, offset: string) => {
		let number = i + 1 + parseInt(offset);
		let correctNumber;
		number <= 1025 ? (correctNumber = number) : (correctNumber = number + 8975);
		return correctNumber;
	};


</script>

<div
	class="flex flex-wrap h-full w-full justify-center"
	style="background-image: url('https://media.istockphoto.com/id/480628083/vector/abstract-background.jpg?s=612x612&w=0&k=20&c=6DKrFHq4of1yUi2dLIsLbJLdEI4AJ1GUvTL35G4Q9io=');"
>
	{#if data}
		{#each pokemon as poke, i}
			<a
				href="/pokedex/pokemon/{getPokemonNumber(i, offset)}"
				class="h-fit w-fit m-2"
				draggable="false"
			>
				<PokemonCard number={i + 1 + parseInt(offset)} name={poke.name} />
			</a>
		{/each}
		<div class="flex w-full m-4 justify-between">
			<button
				class="btn-primary"
				disabled={data.navigation.previous === null}
				on:click={() => {
					goto(`?offset=${parseInt(offset) - parseInt(limit)}&limit=${limit}`);
				}}>Previous</button
			>
			<button
				class="btn-primary"
				disabled={data.navigation.next === null}
				on:click={() => {
					goto(`?offset=${parseInt(offset) + parseInt(limit)}&limit=${limit}`);
				}}>Next</button
			>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
