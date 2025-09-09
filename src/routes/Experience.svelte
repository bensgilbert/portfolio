<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		dateRange: string;
		title: string;
		children?: Snippet;
	}

	let { dateRange, children, title }: Props = $props();
</script>

<div class="relative grid gap-4 overflow-hidden rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md lg:grid-cols-4">
	<p class="font-medium text-primary">{dateRange}</p>
	<div class="space-y-4 lg:col-span-3">
		<h3 class="text-xl font-semibold">{title}</h3>
		{@render children?.()}
	</div>
</div>
