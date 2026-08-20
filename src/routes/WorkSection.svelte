<script>
	import Work from './Work.svelte';
</script>

<section id="work" class="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6 lg:px-8">
	<h2 class="heading text-3xl font-bold">03. Work</h2>
	<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
		<Work
			image="/codecollaborate.png"
			href="https://collaborate.bensgilbert.com"
			title="Code Collaborate"
			description="An online service for chatting, sharing and producing python code collaboratively"
			technologies={['SvelteKit', 'Tailwind CSS', 'TypeScript', 'Python', 'FastAPI', 'WebSocket']}
		/>
		<Work
			image="/tsp.png"
			href="/tsp"
			title="Travelling Salesman Problem"
			description="An interactive demonstration of the NP-hard travelling salesman problem"
			technologies={['p5.js', 'Web Worker']}
		/>
		<Work
			image="/streamit.png"
			href="https://streamit.bensgilbert.com"
			title="StreamIt"
			description="An online streaming service for watching synchronised video together"
			technologies={['SvelteKit', 'Socket.IO', 'WebRTC', 'Mediasoup', 'Audio/Video Streaming']}
		/>
	</div>
</section>
