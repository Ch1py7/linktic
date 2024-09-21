<script lang="ts">
  import Card from '@/components/card.svelte'
  import ProductTableRow from './product-table-row.svelte'

  let products: ProductQuantity[] = []
</script>

{#if products.length !== 0}
  <Card>
    <h2 class="text-2xl font-bold mb-5">Your cart</h2>
    <table class="w-full">
      <thead>
        <tr class="border-b border-b-1 border-solid border-gray">
          <th class="ps-2 pb-3"><p class="font-semibold text-start text-gray-600">Product</p></th>
          <th class="ps-2 pb-3 w-72"
            ><p class="font-semibold text-center text-gray-600">Quantity</p></th
          >
          <th class="ps-2 pb-3 w-60"><p class="font-semibold text-end text-gray-600">Price</p></th>
          <th class="ps-2 pb-3 w-72"><p class="font-semibold text-end text-gray-600">Total</p></th>
          <th class="ps-2 pb-3 w-60"></th>
        </tr>
      </thead>
      <tbody>
        <ProductTableRow bind:products />
      </tbody>
    </table>
  </Card>
{:else}
  <Card>
    <p class="text-center font-semibold">Your cart is empty :(</p>
  </Card>
{/if}
