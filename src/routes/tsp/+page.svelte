<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, slide } from 'svelte/transition';

	import Grid3x3 from './icon/Grid3x3.svelte';
	import Grid3x3Off from './icon/Grid3x3Off.svelte';
	import Home from './icon/Home.svelte';
	import Info from './icon/Info.svelte';
	import InfoOutline from './icon/InfoOutline.svelte';
	import PlayArrow from './icon/PlayArrow.svelte';
	import PlayDisabled from './icon/PlayDisabled.svelte';
	import Undo from './icon/Undo.svelte';

	import { Algorithm } from './algorithm';
	import Sketch from './Sketch.svelte';
	import tsp, { play } from './state.svelte';

	let info = $state(false);
</script>

<svelte:head>
	<title>Travelling Salesman Problem</title>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="absolute inset-x-4 top-4 z-50 rounded bg-nord-6" onclick={(event) => event.stopPropagation()}>
	<div class="flex justify-between p-2 shadow">
		<a href="/">
			<Home />
		</a>
		<button onclick={() => (tsp.grid = !tsp.grid)}>
			{#if tsp.grid}
				<Grid3x3 />
			{:else}
				<Grid3x3Off />
			{/if}
		</button>
		<button onclick={() => (info = !info)}>
			{#if info}
				<Info />
			{:else}
				<InfoOutline />
			{/if}
		</button>
		<button onclick={() => tsp.cities.pop()}>
			<Undo />
		</button>
		{#if tsp.cities.length >= 3}
			<button class="text-nord-14" onclick={() => play()}>
				<PlayArrow />
			</button>
		{:else}
			<button class="text-nord-11">
				<PlayDisabled />
			</button>
		{/if}
	</div>
	{#if info}
		<div class="mx-auto max-w-md space-y-4 rounded p-4" transition:slide={{ easing: cubicOut }}>
			<p class="text-justify">
				The travelling salesman problem asks the following question: "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city
				exactly once and returns to the origin city?"
			</p>
			<p class="text-justify">Click or tap where you'd like to place a city. Once you've placed three or more cities, you can choose an algorithm to find a route between them.</p>
			<p class="text-justify">
				The brute force approach uses a web worker running <a class="text-nord-10 hover:underline" href="https://en.wikipedia.org/wiki/Heap%27s_algorithm">Heap's algorithm</a> to generate all the possible
				permutations of the route the salesman could take.
			</p>
		</div>
	{/if}
</div>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="absolute top-20 left-4 space-y-4 rounded bg-nord-6 p-4 shadow max-sm:inset-x-4 sm:w-80" onclick={(event) => event.stopPropagation()}>
	<h1 class="text-3xl font-semibold">Algorithm</h1>
	<div class="space-y-2">
		<label class="flex items-center justify-between {tsp.algorithm == Algorithm.BruteForce && 'font-medium'}">
			Brute Force
			<input bind:group={tsp.algorithm} type="radio" value={Algorithm.BruteForce} />
		</label>
		<label class="flex items-center justify-between {tsp.algorithm == Algorithm.NearestNeighbour && 'font-medium'}">
			Nearest Neighbour
			<input bind:group={tsp.algorithm} type="radio" value={Algorithm.NearestNeighbour} />
		</label>
	</div>
</div>

<Sketch />

{#if info}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 bg-black opacity-50"
		onclick={(event) => {
			event.stopPropagation();
			info = false;
		}}
		transition:fade={{ easing: cubicOut }}
	></div>
{/if}
