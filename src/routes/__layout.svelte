<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

</script>


<main class="bg-stone100 dark:bg-stone-900 min-h-screen text-stone-700  dark:text-stone-200 relative">
	<Header />
	<slot />
	<Footer />
</main>

