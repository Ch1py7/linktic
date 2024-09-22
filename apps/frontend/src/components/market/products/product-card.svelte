<script lang="ts">
  import Button from '@/components/button.svelte'
  import Card from '@/components/card.svelte'
  import { manageProducts } from '@/lib/storage'
  import { totals } from '@/lib/stores/totals'

  export let product: Product = {
    price: 0,
    image: '',
    description: '',
    title: '',
  }

  const onClick = (product: Product) => {
    manageProducts({ ...product, quantity: 1 })
  }
</script>

<Card>
  <div
    style={`background: url(${product.image}); background-size: cover; background-repeat: no-repeat; aspect-ratio: 1 / 1;`}
    class="background rounded-xl"
  ></div>
  <div>
    <div class="flex justify-between">
      <h1 class="font-semibold">{product.title}</h1>
      <p>${product.price.toLocaleString('en-US')}</p>
    </div>
  </div>
  <Button
    on:click={() => onClick(product)}
    style={'bg-black text-white flex justify-center relative'}
  >
    Add to cart
    {#if $totals.individualTotal.find((p) => p.title === product.title && p.quantity > 0)}
      <span
        class="bg-white w-6 h-6 rounded-full text-center text-black font-bold pointer-events-none absolute right-4"
      >
        {$totals.individualTotal.find((p) => p.title === product.title)?.quantity}
      </span>
    {/if}
  </Button>
</Card>
