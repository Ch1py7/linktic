<script lang="ts">
  import Card from '@/components/card.svelte'
  import { listOrders } from '@/lib/http-client/orders'
  import { onMount } from 'svelte'
  import OrderTableRow from './order-table-row.svelte'

  let orders: Orders[] = []
  let error = ''

  const getOrders = async () => {
    const { data, status } = await listOrders()
    if (status === 200) {
      orders = data
    } else {
      error = 'Problem to retrieve products'
    }
  }

  onMount(() => {
    getOrders()
  })
</script>

{#if error !== ''}
  <p class="text-red-500 font-semibold text-ellipsis">{error}</p>
{/if}
{#if orders.length !== 0}
  <Card>
    <h2 class="text-2xl font-bold mb-5">Your orders</h2>
    <table class="w-full">
      <thead>
        <tr class="border-b border-b-1 border-solid border-gray">
          <th class="ps-2 pb-3">
            <p class="font-semibold text-start text-gray-600">Order id</p>
          </th>
          <th class="ps-2 pb-3 w-72">
            <p class="font-semibold text-center text-gray-600">Products</p>
          </th>
          <th class="ps-2 pb-3 w-60">
            <p class="font-semibold text-end text-gray-600">Status</p>
          </th>
          <th class="ps-2 pb-3 w-60"></th>
        </tr>
      </thead>
      <tbody>
        <OrderTableRow bind:orders />
      </tbody>
    </table>
  </Card>
{:else}
  <Card>
    <p class="text-center font-semibold">Your orders are empty :(</p>
  </Card>
{/if}
