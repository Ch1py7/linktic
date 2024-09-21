<script lang="ts">
  import Button from '@/components/button.svelte'
  import { addProduct, getCart, removeProduct, restProduct } from '@/lib/storage'
  import Icon from '@iconify/svelte'

  export let products: ProductQuantity[] = []

  const removeFromCart = (name: string) => {
    removeProduct(name)
    const Products = getCart()
    products = Products
  }

  const sum = (product: Product) => {
    addProduct(product)
    const Products = getCart()
    products = Products
  }

  const minus = (product: Product) => {
    restProduct(product)
    const Products = getCart()
    products = Products
  }
</script>

{#each products as product, index (index)}
  <tr>
    <td class="ps-2 py-1">
      <div class="flex gap-3">
        <div
          style={`background: url(${product.image}); background-position: center; background-size: cover; background-repeat: no-repeat;`}
          class="h-16 min-w-16 rounded-xl"
        ></div>
        <div>
          <h3 class="font-semibold text-2xl">
            {product.title}
          </h3>
        </div>
      </div>
    </td>
    <td class="ps-2 py-1 text-end text-xl">
      <div class="flex justify-evenly items-center">
        <Button
          style={'border border-1 border-solid border-gray px-2 py-3'}
          on:click={() => minus(product)}><Icon height="16px" icon={'ic:baseline-minus'} /></Button
        >
        {product.quantity}
        <Button
          style={'border border-1 border-solid border-gray px-2 py-3'}
          on:click={() => sum(product)}><Icon height="16px" icon={'ic:baseline-plus'} /></Button
        >
      </div>
    </td>
    <td class="ps-2 py-1 text-end">
      $ {product.price.toLocaleString('en-US')}
    </td>
    <td class="ps-2 py-1 text-end">
      {#if product.quantity}
        $ {(product.price * product.quantity).toLocaleString('en-US')}
      {/if}
    </td>
    <td class="ps-2 py-1 text-center">
      <Button
        style={'text-red-600 font-semibold border border-1 border-solid border-gray px-5'}
        on:click={() => removeFromCart(product.title)}>Borrar</Button
      >
    </td>
  </tr>
{/each}
