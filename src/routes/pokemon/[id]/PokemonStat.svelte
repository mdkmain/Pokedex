<script>
	import { capitalizeStats } from '$lib/utils/capitalize';

	export let name;
	export let baseValue;

	const calcStatValue = (baseValue) => {
		return Math.round((baseValue / 255) * 100);
	};
</script>

<div class="flex flex-col sm:flex-row w-full p-2">
	<div class="flex justify-between w-full sm:w-1/2">
		<p class="pokemonText text-lg">{capitalizeStats(name)}</p>
		<p class="pokemonText text-lg shadow-lg">{baseValue}</p>
	</div>
	<div class="bg-gray-100 opacity-90 rounded-xl w-full sm:w-1/2 h-4 sm:h-6 sm:ml-4 shadow-lg">
		<div
			class="bg-emerald-500 rounded-xl h-full"
			style={`width: ${calcStatValue(baseValue)}%;`}
		></div>
	</div>
</div>
