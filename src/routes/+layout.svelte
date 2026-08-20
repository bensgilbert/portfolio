<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<meta name="author" content="Ben Gilbert" />
</svelte:head>

{@render children?.()}
