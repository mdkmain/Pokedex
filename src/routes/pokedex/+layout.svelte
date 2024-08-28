<script lang="ts">
	import '../../app.css';
	import pokeball from '$lib/images/Pokemon icon.png';
	import PokedexTop from '$lib/images/PokedexScreenTop.svg';
	import PokedexCenter from '$lib/images/PokedexScreenCenter.svg';
	import PokedexBottom from '$lib/images/PokedexScreenBottom.svg';
	import { fly, fade, slide } from 'svelte/transition';
	import { cubicOut, linear } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { filteredStore, store } from '$lib/utils/stores';
	import type { LayoutData } from './$types';
	let openDex = false;
	const toggleOpenDex = () => {
		openDex = !openDex;
	};

	export let data: LayoutData;
	let filterInput: string = '';

	const signOut = async () => {
		const { error } = await data.supabase.auth.signOut();

		if (error) {
			console.log('An error has occurred while trying to log out. Please try again.');
		} else {
			goto('/');
		}
	};

	const setFilteredList = (value: string) => {
		let filteredData = [];
		store.subscribe((list) => {
			filteredData = list.filter((poke) => poke.name.toLowerCase().includes(value.toLowerCase()) || poke.id.toString().includes(value));
		})();

		filteredStore.set(filteredData);
	};
</script>

<div class="flex flex-col h-auto items-center w-auto bg-sky">
	<!-- TODO: calculate the correct vertical offset so this works on different sized screens -->
	{#if !openDex}
		<div
			class="absolute inset-0 flex items-start justify-center -top-24 z-40 select-none"
			style={openDex ? `transform: translateY(-500)` : ''}
			transition:fly={{
				delay: 700,
				duration: 3000,
				easing: cubicOut,
				y: -500,
				opacity: 100
			}}
		>
			<img src={PokedexTop} alt="Pokedex top half" />
		</div>
		<div
			class="absolute inset-0 m-auto flex items-center justify-center z-20 select-none"
			transition:fade={{
				delay: 250,
				duration: 750,
				easing: linear
			}}
		>
			<img src={PokedexCenter} alt="Pokedex center part" />
		</div>
		<div
			class="absolute inset-0 flex items-end justify-center -bottom-24 z-40 select-none"
			transition:fly={{
				delay: 700,
				duration: 3000,
				easing: cubicOut,
				y: 500,
				opacity: 100
			}}
		>
			<img src={PokedexBottom} alt="Pokedex bottom half" />
		</div>
		<button
			class="absolute h-[360px] w-[360px] rounded-full inset-0 m-auto z-50 hover:bg-white hover:opacity-50 duration-1000 transition-all font-PokemonGb text-white"
			disabled={openDex}
			transition:fade={{
				delay: 0,
				duration: 500,
				easing: cubicOut
			}}
			on:click|preventDefault|stopPropagation={toggleOpenDex}>OPEN</button
		>
	{/if}
	{#if openDex}
		<div class="flex flex-col w-full items-center justify-center bg-red-700">
			<div class="flex align-middle m-2">
				<img src={pokeball} alt="Pokeball" class="h-12 w-auto pr-5" />
				<p class="text-5xl font-bold text-blue-100">Pokedex</p>
			</div>
			<button class="btn-primary" on:click={signOut}>Log out</button>
			<input
				type="text"
				class="h-12 m-1 px-4 text-xl rounded-xl w-1/2"
				bind:value={filterInput}
				on:input={() => setFilteredList(filterInput)}
			/>
		</div>
		<slot />
	{/if}
</div>
