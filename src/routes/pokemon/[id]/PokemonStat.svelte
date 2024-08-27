<script>
	import { capitalizeStats } from '$lib/utils/capitalize';

	export let name;
	export let baseValue;

	const calcStatValue = (baseValue) => {
		return Math.round((baseValue / 255) * 100);
	};
</script>

<div class="flex w-full p-2">
	<div class="flex justify-between w-1/2">
		<p class="pokemonText text-lg">{capitalizeStats(name)}</p>
		<p class="pokemonText text-lg shadow-lg">{baseValue}</p>
	</div>
	<div class="bg-gray-100 opacity-90 rounded-xl w-1/2 h-6 ml-4 shadow-lg">
		<div
			class="bg-emerald-500 rounded-xl h-full"
			style={`width: ${calcStatValue(baseValue)}%;`}
		></div>
	</div>
</div>
