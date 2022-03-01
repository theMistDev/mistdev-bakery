export async function get() {
	const resourceUrl = 'http://localhost:1337/api/products?populate=*';
	const res = await fetch(resourceUrl);
  const data = await res.json();
  console.log(data);
	return { body: data };
}
