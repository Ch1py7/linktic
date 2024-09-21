<script lang="ts">
  import ProductCard from '@/components/market/products/product-card.svelte'
  import { listProducts } from '@/lib/http-client/products'
  import { onMount } from 'svelte'

  let products: Product[] = []
  let error = ''

  const getProducts = async () => {
    const { data, status } = await listProducts()
    if (status === 200) {
      products = data
    } else {
      error = 'Problem to fetch products'
    }
  }

  onMount(() => {
    getProducts()
  })
</script>

{#if error !== ''}
  <p class="text-red-500 font-semibold text-ellipsis">{error}</p>
{/if}
<div class="responsive">
  {#each products as product, index (index)}
    <ProductCard {product} />
  {/each}
</div>

<style>
  .responsive {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1rem;
  }
</style>
