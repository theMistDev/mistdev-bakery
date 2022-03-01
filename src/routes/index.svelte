<script>
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Home.MistDev</title>
</svelte:head>

<section class="flex flex-col justify-center py-16">
	<div class="md:grid md:grid-cols-3 ">
		<div class="md:col-span-1 p-3 flex flex-col justify-center items-center">
			<p class="italic">Welcome to</p>
			<h1 class="text-3xl md:text-5xl font-bold">MistDev Bakery</h1>
		</div>
		<div class="md:col-span-2">
			<img src="/mistdev-bakery-bread.png" alt="" />
		</div>
	</div>

	<div class="flex justify-center">
		<button
			on:click={() => {
				goto('/shop');
			}}
			class="border-2 py-3 bg-stone-700 text-stone-100  px-20 rounded-lg"
		>
			Shop Now
		</button>
	</div>
</section>
