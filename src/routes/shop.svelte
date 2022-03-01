<script context="module">
	export async function load({ fetch }) {
		const resourceUrl = `api/products`;
		const res = await fetch(resourceUrl);
		const data = await res.json();
		const loadProducts = data.data.map((data) => {
			return {
				id: data.id,
				title: data.attributes.title,
				description: data.attributes.description,
				picture: data.attributes.picture.data.attributes.url,
				stock: data.attributes.stock,
				price: data.attributes.price,
				quantity: 0
			};
		});

		if (res.ok) {
			return {
				props: {
					loadProducts
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load url`)
		};
	}
</script>

<script>
	import { products } from '$lib/stores/productsStore';
	import { cart } from '$lib/stores/cartStores';
	import { goto } from '$app/navigation';

	export let loadProducts;


	if ($products.length === 0) {
		products.set(loadProducts);
	}

	let basket = $cart;

	const addToCart = (product) => {
		product.quantity += 1;
		products.update((product) => product);
		for (let item of basket) {
			if (item.id === product.id) {
				basket = basket;
				return;
			}
		}

		basket = [...basket, product];
		cart.set(basket);
	};

	$: console.log($cart);
	$: console.log($products);
</script>

<svelte:head>
	<title>Shop.MistDev</title>
</svelte:head>

<div class="pt-16 px-10">
	<h3 class="text-3xl py-3 text-center md:text-left">Shop</h3>
</div>

<section class="px-10 py-6">
	{#each $products as product}
		<div
			class="flex flex-col md:grid grid-cols-2 border py-5 my-8 rounded-lg justify-center items-center content-center hover:border-2 shadow-lg {product.quantity >
			0
				? 'dark:bg-stone-600'
				: ''}"
		>
			<div class="col-span-1">
				<img class="w-64" src={product.picture} alt={product.title} />
			</div>

			<div class="col-span-1">
				<div class="flex flex-col justify-around items-center md:items-start">
					<h3 class="font-bold py-3 text-xl">{product.title}</h3>
					<p class="text-center">{product.description}</p>
					<p class="font-bold text-lg py-3"><span>&#x20A6 </span>{product.price}</p>
					<div class="flex flex-row">
						{#if product.quantity > 0}
							<button
								on:click|preventDefault={() => {
									product.quantity = 0;
								}}
								class="my-3 py-2 px-3 border border-stone-700 dark:border-stone-200 rounded"
							>
								Remove
							</button>
							<div class="flex flex-row items-center px-6 ">
								<button
									class="ml-4 px-4 py-2 border border-stone-700 dark:border-stone-200 rounded"
									on:click={() => {
										goto('/cart');
									}}
								>
									Go to Cart
								</button>
							</div>
						{:else}
							<button
								on:click|preventDefault={() => {
									addToCart(product);
								}}
								class="my-3 py-2 px-3 border border-stone-700 dark:border-stone-200 rounded"
							>
								Add to Cart
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</section>
