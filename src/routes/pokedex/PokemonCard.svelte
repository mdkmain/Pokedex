<script lang="ts">
	import { scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { capitalizeFirstLetter } from '$lib/utils/capitalize';

	export let number;
	export let name;

	let baseUrl: string;

	$: (async () => {
		// Function to check if the image exists
		const checkIfImageExists = async (url: string): Promise<boolean> => {
			try {
				const response = await fetch(url, { method: 'HEAD' });
				return response.ok;
			} catch (error) {
				console.error('Error checking image:', error);
				return false;
			}
		};

		let imgNumber = number;
		if (number > 1025) {
			imgNumber = number + 8975;
		}

		const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${imgNumber}.gif`;

		// Check if the GIF exists
		const exists = await checkIfImageExists(url);
		if (exists) {
			baseUrl = url;
		} else {
			// Return a fallback URL if the GIF does not exist
			baseUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imgNumber}.png`; // Replace with your actual fallback URL
		}
	})();
</script>

<div
	class="flex flex-col justify-between align-middle border-[1px]-blue-950 p-3 w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] sm:max-h-[180px] sm:max-w-[180px] rounded-3xl bg-neutral-100 bg-opacity-50 shadow-md hover:bg-cyan-200 hover:bg-opacity-50 transition-colors hover:shadow-xl hover:shadow-cyan-300"
	draggable="false"
>
	{#key number}
		<img
			src={baseUrl}
			alt={name}
			class="h-auto w-auto min-h-14 min-w-16 m-auto"
			in:scale={{
				delay: 0,
				duration: 500,
				easing: cubicInOut
			}}
			draggable="false"
		/>
		<div class="flex w-full justify-between text-[18px] font-bold text-black">
			<div class="font-PokemonGb text-red-900 text-xs">#{number}</div>
			<div class="font-PokemonGb text-[9px] sm:text-xs">
				{capitalizeFirstLetter(name)}
			</div>
		</div>
	{/key}
</div>
