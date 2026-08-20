<script>
	import { Link } from '@lucide/svelte';
</script>

<section id="hero" class="relative mx-auto flex h-svh max-h-192 max-w-6xl flex-col justify-center overflow-hidden px-8 sm:px-12 lg:px-16">
	<div class="pointer-events-none absolute -top-20 -right-20 z-50 size-64 rounded-full bg-primary/10 blur-3xl"></div>
	<div class="absolute -bottom-20 -left-20 size-64 rounded-full bg-primary/10 blur-3xl"></div>
	<div class="absolute top-0 right-0 z-50 h-8 w-1 rounded-b-full bg-primary"></div>
	<div class="absolute top-0 right-0 z-50 h-1 w-8 rounded-l-full bg-primary"></div>
	<div class="absolute bottom-0 left-0 h-8 w-1 rounded-t-full bg-primary"></div>
	<div class="absolute bottom-0 left-0 h-1 w-8 rounded-r-full bg-primary"></div>
	<div class="space-y-4">
		<div class="space-y-2">
			<h1 class="text-5xl font-bold sm:text-8xl">Ben <span class="text-primary">Gilbert</span></h1>
			<h2 class="text-3xl font-semibold sm:text-5xl">Full Stack Developer</h2>
		</div>
		<p class="max-w-2xl text-lg text-gray-700">
			I'm a recent computer science graduate from the University of Sheffield with a passion for <span class="font-medium text-primary">cyber security</span>,
			<span class="font-medium text-primary">networking</span>, and <span class="font-medium text-primary">web development</span>.
		</p>
		<div class="flex gap-4">
			<a
				class="flex items-center justify-center gap-1 rounded border-2 border-primary bg-primary px-5 py-2 text-sm font-medium text-white outline-offset-2 outline-primary transition-colors hover:border-primary-dark hover:bg-primary-dark focus-visible:outline-2"
				href="#about"
			>
				Learn More
			</a>
			<a
				class="flex items-center justify-center gap-1 rounded border-2 border-primary px-5 py-2 text-sm font-medium text-gray-700 outline-offset-2 outline-primary not-focus-visible:transition-colors hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white focus-visible:outline-2"
				href="/Benjamin%20Samuel-Gilbert.pdf"
			>
				CV
				<Link size={16} />
			</a>
		</div>
	</div>
</section>
