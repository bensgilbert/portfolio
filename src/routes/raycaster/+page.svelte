<script>
  import { onMount } from 'svelte';

  const targetUrl = '/raycaster/index.html';

  onMount(() => {
    window.location.replace(targetUrl);
  });
</script>

<p>Redirecting...</p>
