<script>
	import { Github, Instagram, Linkedin, Mail, Send } from '@lucide/svelte';
</script>

<section id="contact" class="relative overflow-hidden bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
	<div class="absolute bottom-0 left-0 size-64 rounded-full bg-primary/5 blur-3xl"></div>
	<div class="absolute top-0 right-0 size-64 rounded-full bg-primary/5 blur-3xl"></div>
	<div class="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
		<div class="space-y-12">
			<h2 class="heading text-3xl font-bold">04. Contact</h2>
			<div class="space-y-6">
				<h3 class="text-2xl font-semibold">Get in touch</h3>
				<p class="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
				<a
					class="inline-flex items-center gap-2 rounded text-lg font-medium outline-offset-3 outline-primary transition-colors hover:text-primary focus-visible:outline-2"
					href="mailto:bensgilbert@outlook.com"
				>
					<Mail class="text-primary" size={20} />
					bensgilbert@outlook.com
				</a>
				<div class="flex gap-4 pt-4">
					<a
						aria-label="Github"
						class="rounded-full bg-white p-2 shadow outline-offset-4 outline-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2"
						href="https://github.com/bensgilbert"
						rel="noopener noreferrer"
						target="_blank"
					>
						<Github size={20} />
					</a>
					<a
						aria-label="LinkedIn"
						class="rounded-full bg-white p-2 shadow outline-offset-4 outline-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2"
						href="https://linkedin.com/in/bensgilbert"
						rel="noopener noreferrer"
						target="_blank"
					>
						<Linkedin size={20} />
					</a>
					<a
						aria-label="Instagram"
						class="rounded-full bg-white p-2 shadow outline-offset-4 outline-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2"
						href="https://www.instagram.com/_ben._.s/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<Instagram size={20} />
					</a>
				</div>
			</div>
		</div>
		<form action="https://formspree.io/f/mjkwzndr" class="flex flex-col gap-3 rounded-lg bg-white p-6 shadow transition-shadow focus-within:shadow-md" method="post">
			<label class="flex flex-col gap-1 text-sm font-medium text-gray-600 has-valid:text-gray-950">
				Name
				<input class="rounded border border-gray-200 p-2 font-normal text-gray-900 outline-offset-2 outline-primary focus-visible:outline-2" name="name" placeholder="John Doe" required type="text" />
			</label>
			<label class="flex flex-col gap-1 text-sm font-medium text-gray-600 has-valid:text-gray-950">
				Email
				<input
					class="rounded border border-gray-200 p-2 font-normal text-gray-900 outline-offset-2 outline-primary focus-visible:outline-2"
					name="email"
					placeholder="johndoe@example.com"
					required
					type="email"
				/>
			</label>
			<label class="flex grow flex-col gap-1 text-sm font-medium text-gray-600 has-valid:text-gray-950">
				Message
				<textarea
					class="grow rounded border border-gray-200 p-2 font-normal text-gray-900 outline-offset-2 outline-primary focus-visible:outline-2"
					name="message"
					placeholder="Hello World!"
					required
					rows="3"
					value={''}
				></textarea>
			</label>
			<button class="flex justify-center gap-2 rounded bg-primary p-2 text-sm font-medium text-white outline-offset-2 outline-primary focus-visible:outline-2" type="submit">
				Send Message
				<Send size={20} />
			</button>
		</form>
	</div>
</section>
