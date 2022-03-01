<script>
	let navItems = [
		{ title: 'Home', href: '/' },
		{ title: 'Shop', href: '/shop' },
		{ title: 'Cart', href: '/cart' },

	];

	import { page, session } from '$app/stores';

	console.log($page.url.pathname);
</script>

<header
	class="bg-stone-200 dark:bg-stone-800 text-stone-700  dark:text-stone-200 flex flex-row justify-between items-center py-3 px-5"
>
	<div class="font-bold text-3xl dark:text-red-200 text-red-500 w-full">
		<a href="/" class="">MistDev Bakery</a>
	</div>

	<nav class="flex justify-around w-full">
		{#each navItems as item}
			<a class={item.href===$page.url.pathname ? 'underline underline-offset-8': ''} href={item.href}>{item.title}</a>
		{/each}
	</nav>
</header>
