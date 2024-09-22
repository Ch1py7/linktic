<script lang="ts">
  import Card from '@/components/card.svelte'
  import { listProducts } from '@/lib/http-client/products'
  import { onMount } from 'svelte'
  import ProductTableRow from './product-table-row.svelte'

  let products: AllProducts[] = []
  let productDeleted = ''
  let productUpdated = ''

  const list = async () => {
    const { data, status } = await listProducts()
    if (status === 200) {
      products = data.map((d) => {
        return {
          ...d,
          edit: false,
        }
      })
    }
  }

  onMount(() => {
    list()
  })
</script>

<Card>
  <h2 class="text-2xl font-bold mb-5">Products</h2>
  {#if productDeleted !== ''}
    <p class="text-green-500 text-ellipsis">{productDeleted}</p>
  {/if}
  {#if productUpdated !== ''}
    <p class="text-green-500 text-ellipsis">{productUpdated}</p>
  {/if}
  <table class="w-full">
    <thead>
      <tr class="border-b border-b-1 border-solid border-gray">
        <th class="ps-2 pb-3">
          <p class="font-semibold text-start text-gray-600">ID</p>
        </th>
        <th class="ps-2 pb-3 w-72">
          <p class="font-semibold text-center text-gray-600">Name</p>
        </th>
        <th class="ps-2 pb-3 w-72">
          <p class="font-semibold text-center text-gray-600">Description</p>
        </th>
        <th class="ps-2 pb-3 w-32">
          <p class="font-semibold text-center text-gray-600">Price</p>
        </th>
        <th class="ps-2 pb-3 w-60"></th>
      </tr>
    </thead>
    <tbody>
      <ProductTableRow bind:productDeleted bind:productUpdated {products} />
    </tbody>
  </table>
</Card>
