<script>
	import AboutSection from './AboutSection.svelte';
	import ContactSection from './ContactSection.svelte';
	import ExperienceSection from './ExperienceSection.svelte';
	import Header from './Header.svelte';
	import HeroSection from './HeroSection.svelte';
	import WorkSection from './WorkSection.svelte';
</script>

<svelte:head>
	<title>Ben Gilbert's Portfolio</title>
	<meta name="description" content="Ben Gilbert is a recent computer science graduate from the University of Sheffield with a passion for cyber security, networking, and web development." />
</svelte:head>

<div class="font-['InterVariable']">
	<Header />
	<main>
		<HeroSection />
		<AboutSection />
		<ExperienceSection />
		<WorkSection />
		<ContactSection />
	</main>
</div>
