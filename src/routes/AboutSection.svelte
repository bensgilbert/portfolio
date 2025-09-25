<section id="about" class="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6 lg:px-8">
	<h2 class="heading text-3xl font-bold">01. About</h2>
	<div class="grid gap-12 lg:grid-cols-3">
		<div class="space-y-6 text-gray-700 lg:col-span-2">
			<p>
				My coding journey began at the age of eight, experimenting with simple scripts in <span class="font-semibold text-primary">Scratch</span>. As my confidence grew, I transitioned to
				<span class="font-semibold text-primary">Python</span>, creating small tools to automate everyday tasks. This curiosity led me to explore
				<span class="font-semibold text-primary">web development</span>, and soon after, <span class="font-semibold text-primary">cybersecurity</span>. I enjoyed not only building websites but also
				identifying and addressing their vulnerabilities, continuously learning and improving along the way.
			</p>
			<p>
				During my time at <span class="font-semibold text-primary">Sheffield University</span>, I've strengthened my core knowledge of computer science while gaining practical experience through
				collaborative projects and real-world challenges. A standout experience was taking part in <span class="font-semibold text-primary">HackSheffield</span>, a 24-hour hackathon, where my team and
				I built a web app designed to support food distribution for those in need. While we didn't take first place, we won a t-shirt each from <span class="font-semibold text-primary">GitHub</span> for
				our effective use of git.
			</p>
		</div>
		<div class="space-y-6">
			<h3 class="relative inline-block text-xl font-semibold">
				Skills
				<span class="absolute bottom-0 left-0 h-0.5 w-1/2 rounded-full bg-primary"></span>
			</h3>
			<div class="space-y-3 text-gray-900">
				<div class="flex flex-wrap gap-3">
					<p class="skill">JavaScript / TypeScript</p>
					<p class="skill">Python</p>
					<p class="skill">C#</p>
					<p class="skill">Java</p>
					<p class="skill">C++</p>
					<p class="skill">Ruby</p>
					<p class="skill">Haskell</p>
				</div>
				<div class="flex flex-wrap gap-3">
					<p class="skill">SvelteKit</p>
					<p class="skill">Tailwind</p>
					<p class="skill">FastAPI</p>
					<p class="skill">Socket.io</p>
					<p class="skill">React</p>
					<p class="skill">Vue.js</p>
					<p class="skill">Flask</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "../app.css";

	.skill {
		@apply cursor-default rounded-full border border-gray-200 px-3 py-1 text-sm transition-colors duration-150 hover:border-primary hover:bg-primary hover:text-white;
	}
</style>
