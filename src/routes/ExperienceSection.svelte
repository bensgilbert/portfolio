<script>
	import Experience from './Experience.svelte';
</script>

<section id="experience" class="relative overflow-hidden bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
	<div class="absolute bottom-0 left-0 size-64 rounded-full bg-primary/5 blur-3xl"></div>
	<div class="absolute top-0 right-0 size-64 rounded-full bg-primary/5 blur-3xl"></div>
	<div class="mx-auto max-w-6xl space-y-12">
		<h2 class="heading text-3xl font-bold">02. Experience</h2>
		<Experience dateRange="Sep 2024 - Present" title="Avis Drone Labs">
			<!-- <p class="text-gray-700">
				As a member of Avis Drone Labs, a student-led project at the <a class="font-semibold text-black transition-colors hover:text-primary" href="https://sheffield.ac.uk">University of Sheffield</a
				>, I have played a key role in advancing our UAV technology for the American SUAS competition through the following contributions:
			</p>
			<p class="text-gray-700">
				<span class="font-semibold">Synthetic Data Generation for Image Classification:</span> Developed a Blender simulation to generate aerial images from 30 metres above ground, providing accurate training
				data for our machine learning model
			</p>
			<p class="text-gray-700">
				<span class="font-semibold">Autonomous Flight Programming:</span> Utilised ArduPlane and the MAVLink protocol to program our UAV for fully autonomous missions, including complex waypoint navigation
				and precise payload deliveries.
			</p> -->
			<p class="text-gray-700">
				As a member of Avis Drone Labs, a student-led project at the <a class="font-semibold text-black transition-colors hover:text-primary" href="https://sheffield.ac.uk">University of Sheffield</a
				>, I have played a key role in advancing our UAV technology for the American SUAS competition through the following contributions:
			</p>
			<p class="text-gray-700">
				<span class="font-semibold">Synthetic Data Generation for Image Classification:</span> Developed a Blender simulation to generate aerial images from 30 metres above ground, providing accurate training
				data for our machine learning model.
			</p>
			<p class="text-gray-700">
				<span class="font-semibold">Autonomous Flight Programming:</span> Utilised ArduPlane and the MAVLink protocol to program our UAV for fully autonomous missions, including complex waypoint navigation
				and precise payload deliveries.
			</p>
			<p class="text-gray-700">
				<span class="font-semibold">Aerial Mapping:</span> Integrated a GoPro Hero 11 with our UAV using Python to automate high-resolution image capture for real-time terrain mapping and analysis during
				flight.
			</p>
			<p class="text-gray-700">
				Additionally, I'm part of the team developing <a class="font-semibold text-black transition-colors hover:text-primary" href="https://fgcs.avisdronelabs.uk"
					>Falcon Ground Control Station (FGCS)</a
				>, another student-led project focused on building a modern, open-source ground control station for ArduPilot aircraft.
			</p>
		</Experience>
		<Experience dateRange="Jun 2025 - Sep 2025" title="Cyber Summer School">
			<p class="text-gray-700">
				I completed a 10-week government-run Cyber Summer School which combined expert-led lectures, technical workshops, and structured projects simulating real-world cyber threats. I gained hands-on
				experience in penetration testing, malware analysis, ethical hacking, and digital forensics - building both my technical capabilities and my understanding of cybersecurity.
			</p>
		</Experience>
	</div>
</section>
