<script lang="ts">
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import { slide } from 'svelte/transition';

	let menu = $state(false);
	let scrollY = $state(0);
	let scrolled = $derived(scrollY > 0);
	let scrolledSection = $state('');
</script>

<svelte:window
	bind:scrollY
	onscroll={() => {
		['hero', 'about', 'experience', 'work', 'contact'].forEach((section) => {
			const element = document.getElementById(section);
			if (element) {
				const rect = element.getBoundingClientRect();
				if (rect.top <= 164) {
					scrolledSection = section;
				}
			}
		});
	}}
/>

<header class="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur-md transition-shadow {scrolled && 'shadow-md'}">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 transition-all sm:px-6 lg:px-8 {scrolled ? 'py-2' : 'py-4'}">
		<a class="text-xl font-bold" href="/">BG</a>
		<nav class="space-x-8 max-md:hidden">
			<a class={[scrolledSection == 'about' && 'text-primary']} href="#about">01. About</a>
			<a class={[scrolledSection == 'experience' && 'text-primary']} href="#experience">02. Experience</a>
			<a class={[scrolledSection == 'work' && 'text-primary']} href="#work">03. Work</a>
			<a class={[scrolledSection == 'contact' && 'text-primary']} href="#contact">04. Contact</a>
		</nav>
		<button class="md:hidden" onclick={() => (menu = !menu)}>
			{#if menu}
				<X />
			{:else}
				<Menu />
			{/if}
		</button>
	</div>
	{#if menu}
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<div class="transition-shadow md:hidden {!scrolled && 'shadow-md'}" onclick={() => (menu = !menu)} transition:slide>
			<nav class="flex flex-col gap-2 px-4 transition-all sm:px-6 lg:px-8 {scrolled ? 'pb-2' : 'pb-4'}">
				<a class={[scrolledSection == 'about' && 'text-primary']} href="#about">01. About</a>
				<a class={[scrolledSection == 'experience' && 'text-primary']} href="#experience">02. Experience</a>
				<a class={[scrolledSection == 'work' && 'text-primary']} href="#work">03. Work</a>
				<a class={[scrolledSection == 'contact' && 'text-primary']} href="#contact">04. Contact</a>
			</nav>
		</div>
	{/if}
</header>

<style lang="postcss">
	@reference "../app.css";

	a {
		@apply transition-colors hover:text-primary active:text-primary;
	}
</style>
