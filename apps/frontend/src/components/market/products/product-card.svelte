<script lang="ts">
  import Button from '@/components/button.svelte'
  import Card from '@/components/card.svelte'

  export let product: Product = {
    price: 0,
    image: '',
    description: '',
    title: '',
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
  <Button on:click={() => {}} style={'bg-black text-white flex justify-center relative'}>
    Add to cart
  </Button>
</Card>
