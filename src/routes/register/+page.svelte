<script lang="ts">
	import { enhance } from '$app/forms';
	import '../../app.css';
	import type { ActionData, SubmitFunction } from '../pokedex/register/$types.js';

	export let form: ActionData;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			update();
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div
	class="w-dvw h-dvh bg-cover"
	style="background-image: url(https://wallpapers.com/images/hd/every-legendary-pokemon-651dl7pr5nrs7bgu.jpg);"
>
	<form
		class="absolute inset-0 m-auto h-2/3 sm:h-96 w-3/4 sm:w-1/2 flex flex-col items-center py-2 sm:bottom-96 bg-white bg-opacity-85 rounded-3xl justify-evenly"
		method="POST"
		use:enhance={handleSubmit}
	>
		<h1 class="font-PokemonGb">Pokedex</h1>
		<p class="font-PokemonGb text-[10px] sm:text-base text-center px-2">
			Sign in with your email and password below
		</p>
		{#if form?.message !== undefined}
			<div class="success {form?.success ? '' : 'fail'}">
				{form?.message}
			</div>
		{/if}
		<div class="w-2/3 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
			<label for="email" class="font-PokemonGb text-xs sm:text-base">Email address</label>
			<input
				id="email"
				name="email"
				class="font-PokemonGb text-sm h-8 w-60 px-2 sm:w-auto shadow-lg"
				type="email"
				placeholder="Your email"
				value={form?.email ?? ''}
				required
			/>
		</div>
		{#if form?.errors?.email}
			<span class="flex items-center text-sm error">
				{form?.errors?.email}
			</span>
		{/if}
		<div class="w-2/3 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
			<label for="password" class="font-PokemonGb text-xs sm:text-base">Password</label>
			<input
				id="password"
				name="password"
				class="font-PokemonGb text-sm h-8 w-60 px-2 sm:w-auto shadow-lg"
				type="password"
				placeholder="Your password"
				required
			/>
		</div>
		{#if form?.errors?.password}
			<span class="flex items-center text-sm error">
				{form?.errors?.password}
			</span>
		{/if}
		<div class="w-2/3 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
			<label for="password" class="font-PokemonGb text-xs sm:text-base">Confirm Password</label>
			<input
				id="confirm"
				name="confirm"
				class="font-PokemonGb text-sm h-8 w-60 px-2 sm:w-auto shadow-lg"
				type="password"
				placeholder="Repeat your password"
				required
			/>
		</div>
		<div>
			<button
				class="button primary block btn-primary font-PokemonGb w-60 h-12 rounded-2xl"
				disabled={loading}
			>
				{loading ? 'Loading' : 'Register'}
			</button>
		</div>
		<div class="font-PokemonGb flex justify-center text-[10px] sm:text-sm">
			<a href="/" class="text-center">Already a member? Sign in.</a>
		</div>
	</form>
</div>
