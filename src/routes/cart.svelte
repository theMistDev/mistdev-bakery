<script>
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cartStores';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	$: checkout = false;

	onMount(() => {
		if ($cart.length === 0) {
			goto('/shop');
		}
	});

	$: total = $cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
</script>

<svelte:head>
	<title>Cart.MistDev</title>
</svelte:head>

<div class="pb-8">
	<div class="text-3xl px-10 py-5">Cart</div>
	<div class="md:grid flex flex-col grid-cols-3 gap-4 text-sm md:text-base px-2 pb-8">
		<div class="col-span-2 grid grid-cols-5 border  place-items-center">
			<h4 class="col-span-1 border-2 w-full text-center mb-5 p-3">Picture</h4>
			<h4 class="col-span-1  border-2 w-full text-center mb-5 p-3">Product</h4>
			<h4 class="col-span-1 border-2 w-full text-center mb-5 p-3">Quantity</h4>
			<h4 class="col-span-1 border-2 w-full text-center mb-5 p-3">Price(&#x20A6)</h4>
			<h4 class="col-span-1 border-2 w-full text-center mb-5 p-3">Amount(&#x20A6)</h4>

			{#each $cart as product}
				{#if product.quantity > 0}
					<img class="col-span-1 w-40" src={product.picture} alt={product.title} />
					<p class="col-span-1">{product.title}</p>
					<div class="col-span-1 flex flex-row items-center ">
						<button
							class=" p-2 border rounded"
							on:click={() => {
								product.quantity--;
							}}>-</button
						>
						<p class=" p-2 border rounded">
							{product.quantity <= product.stock ? product.quantity : product.stock}
						</p>
						<button
							disabled={product.quantity >= product.stock}
							class=" p-2 border rounded "
							on:click={() => {
								product.quantity++;
							}}
						>
							+
						</button>
					</div>

					<p class="col-span-1">{product.price}</p>
					<p class="col-span-1">{product.price * product.quantity}</p>
				{/if}

				{#if product.quantity >= product.stock}
					<div class="col-span-5 pb-5 w-full dark:text-blue-200 text-blue-700">
						We currently have only {product.stock}
						{product.title} in stock
					</div>
				{/if}
			{/each}

			<h4 class="col-span-4 border-2 w-full text-center p-3 font-bold">Total</h4>
			<h4 class="col-span-1 border-2 w-full text-center p-3 font-bold">
				<span>&#x20A6 </span>{total}
			</h4>
		</div>

		<div class="border col-span-1 flex flex-col items-center p-3">
			<button
				on:click|preventDefault={() => {
					goto('/shop');
				}}
				class="text-lg w-full  border-2 py-3 bg-stone-700 text-stone-100  px-20 rounded-lg"
				>Continue Shopping</button
			>

			<div
				class="w-full flex flex-col items-center justify-around {checkout === true ? 'hidden' : ''}"
			>
				<p class="py-5 text-lg">Your total order is <span>&#x20A6 </span>{total}</p>

				<button
					on:click|preventDefault={() => {
						checkout = true;
					}}
					class=" text-lg w-full  border-2 py-3 bg-stone-700 text-stone-100  px-20 rounded-lg"
					>Check Out</button
				>
			</div>

			<div
				in:fly={{ y: 200, duration: 2000 }}
				out:fade
				class="bg-stone-500/20 dark:bg-stone-500/30 py-5 px-3 {checkout === true ? '' : 'hidden'}"
			>
				<p class="py-10">
					Your account with MistDev Bakery would be debited with <span>&#x20A6</span>{total} and the
					products shipped to the address registered with us.
				</p>

				<div class="flex">
					<button
						class=" mx-2 text-lg w-full  border-2 py-3 bg-stone-700 text-stone-100  px-20 rounded-lg"
						>Proceed?</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
