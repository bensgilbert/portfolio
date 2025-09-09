<section id="about" class="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6 lg:px-8">
	<h2 class="heading text-3xl font-bold">01. About</h2>
	<div class="grid gap-12 lg:grid-cols-3">
		<div class="space-y-6 lg:col-span-2">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
		<div class="space-y-6">
			<h3 class="relative inline-block text-xl font-semibold">
				Skills
				<span class="absolute bottom-0 left-0 h-0.5 w-1/2 rounded-full bg-primary"></span>
			</h3>
			<div class="flex flex-wrap gap-3">
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
				<p class="skill">Skill</p>
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
