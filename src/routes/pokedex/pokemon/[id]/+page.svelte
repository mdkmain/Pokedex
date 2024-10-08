<script lang="ts">
	import { blur, scale } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import { capitalizeFirstLetter } from '$lib/utils/capitalize.js';
	import PokemonStat from './PokemonStat.svelte';
	import { backgrounds } from '$lib/utils/backgrounds';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let audio;
	let showClickMe = false;

	export let data;
	const pokemon = data.pokemon;
	const pokemonName = capitalizeFirstLetter(pokemon.name);
	const typeImageURLs: {
		name: string;
		url: string;
	}[] = [];

	const extractTypes = (types: []) => {
		types.forEach((element: any) => {
			if (!element.type) return;
			const typeNumber = element.type.url.split('/').filter(Boolean).pop();
			typeImageURLs.push({
				name: element.type.name,
				url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${typeNumber}.png`
			});
		});
	};
	$: extractTypes(pokemon.types);

	const extractEnglishFlavourText = (textList: []) => {
		if (textList.length === 0) return -1;
		return textList.findIndex((entry) => entry.language.name === 'en');
	};
	const index = extractEnglishFlavourText(data.flavour.flavor_text_entries ?? []);
	const flavourText =
		index !== -1
			? data.flavour.flavor_text_entries[index].flavor_text
			: 'This Pokemon has no flavourtext.';

	const pokemonCry = pokemon.cries.latest;

	const playAudio = () => {
		audio.play();
	};

	$: backgroundImageUrl = 'none';
	onMount(() => {
		if (typeImageURLs.length > 0 && typeImageURLs[0].name in backgrounds) {
			backgroundImageUrl = `url(${backgrounds[typeImageURLs[0].name]})`;
		}
	});
</script>

<div
	class="flex flex-col sm:h-dvh m-2 sm:m-8 align-middle text-center rounded-3xl overflow-hidden bg-cover"
	style={`background-image: ${backgroundImageUrl}`}
>
	{#if data}
		<div
			class="flex flex-col sm:flex-row h-[70%] overflow-hidden w-full border-gray-700 border-4 border-b-0 rounded-t-3xl"
		>
			<!-- BASIC INFO AREA -->
			<div class="flex flex-col text-left w-full sm:w-1/4 p-4 bg-black bg-opacity-40">
				<button
					on:click={() => {
						goto('/pokedex');
					}}
					class="btn-primary h-12 mb-3 rounded-xl">Back</button
				>
				<p class="pokemonText my-2">Pokemon Nr. {pokemon.id}</p>
				<p class="pokemonText my-2">{pokemonName}</p>
				<p class="pokemonText my-2">Height: {pokemon.height}</p>
				<p class="pokemonText my-2">Weight: {pokemon.weight}</p>
				<div class="flex">
					{#each typeImageURLs as typeImage}
						<img src={typeImage.url} alt={typeImage.name} class="w-24 sm:w-40 mr-2" />
					{/each}
				</div>
			</div>
			<!-- IMAGE AREA -->
			<div class="sm:w-1/4 flex flex-col justify-end bg-black bg-opacity-40">
				<audio bind:this={audio}>
					<source src={pokemonCry} type="audio/ogg" />
				</audio>
				<img
					src={pokemon.sprites.other['official-artwork'].front_default}
					alt={pokemon.name}
					class="w-full p-4 hover:animate-wiggle"
					on:click={playAudio}
					on:mouseenter={() => (showClickMe = true)}
					on:mouseleave={() => (showClickMe = false)}
					draggable="false"
				/>
				<div class="min-h-12">
					{#if showClickMe}
						<p
							class="font-PokemonGb min-h-12 text-white"
							transition:blur={{
								delay: 50,
								duration: 150,
								opacity: 0.5,
								easing: linear
							}}
						>
							Click to hear me rawr!
						</p>
					{/if}
				</div>
			</div>
			<!-- STATS AREA -->
			<div class="flex flex-col text-left sm:w-2/4 p-4 bg-black bg-opacity-40">
				{#each pokemon.stats as stat}
					<PokemonStat name={stat.stat.name} baseValue={stat.base_stat} />
				{/each}
			</div>
		</div>
		<!-- FLAVOURTEXT AREA -->
		<div
			class="h-[30%] w-full bg-blue-100 flex text-left p-2 sm:p-10 bg-opacity-80 border-gray-700 border-4 rounded-b-3xl"
		>
			<p class="pokemonText text-black text-base sm:text-3xl">
				{flavourText}
			</p>
		</div>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
