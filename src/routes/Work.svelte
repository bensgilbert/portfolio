<script lang="ts">
	import { ExternalLink, Github } from '@lucide/svelte';

	interface Props {
		image: string;
		github?: string;
		href?: string;
		title: string;
		description: string;
		technologies: string[];
	}

	let { image, github, href, title, description, technologies }: Props = $props();

	let hover = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="group" onmouseenter={() => (hover = true)} onmouseleave={() => (hover = false)}>
	<div class="h-full overflow-hidden rounded-lg shadow transition group-hover:-translate-y-2 group-hover:shadow-lg">
		<div class="relative h-46 bg-black">
			<img class="size-full object-cover" src={image || `https://placehold.co/600x400/black/white?text=${encodeURI(title)}`} alt={title} />
			{#if github || href}
				<div class="absolute inset-0 flex items-center justify-center gap-4 bg-primary/75 {hover ? 'opacity-100' : 'opacity-0'} transition-opacity focus-within:opacity-100">
					{#if github}
						<a aria-label={title} class="rounded-full bg-white p-2 transition-colors hover:text-primary" href={github}>
							<Github size={20} />
						</a>
					{/if}
					{#if href}
						<a aria-label={title} class="rounded-full bg-white p-2 transition-colors hover:text-primary" {href}>
							<ExternalLink size={20} />
						</a>
					{/if}
				</div>
			{/if}
		</div>
		<div class="space-y-4 p-6">
			<h3 class="text-2xl leading-none font-semibold">{title}</h3>
			<p class="text-sm text-gray-600">{description}</p>
			{#if technologies.length}
				<div class="flex flex-wrap gap-2">
					{#each technologies as technology}
						<p class="rounded-full border border-primary/50 px-2.5 py-0.5 text-xs font-semibold text-primary">{technology}</p>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
