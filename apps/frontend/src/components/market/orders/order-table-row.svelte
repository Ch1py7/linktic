<script lang="ts">
  import Button from '@/components/button.svelte'
  import ShipStatus from '@/components/market/shipStatus.svelte'
  import { cancelOrder, listOrders } from '@/lib/http-client/orders'

  export let orders: Orders[] = []

  const cancel = async(id: number) => {
    const { status } = await cancelOrder(id)

    if (status === 200) {
      const { data } = await listOrders()
      orders = data
    }
  }
</script>

{#each orders as order, index (index)}
  <tr class={`${index % 2 && 'bg-gray-100'}`}>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2">
      <p>{order.order_id}</p>
    </td>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-start text-xl">
      {#each order.order_products as product, index (index)}
        <p class="font-semibold">
          {product.title}
        </p>
      {/each}
    </td>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-start text-xl">
      {#each order.order_products as product, index (index)}
        <p>
          {product.quantity}
        </p>
      {/each}
    </td>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-center">
      <ShipStatus status={order.status} />
    </td>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-center">
      <Button
        style={`text-red-600 font-semibold border border-1 border-solid ${index % 2 && 'border-gray-300'} px-5`}
        on:click={() => cancel(order.order_id)}>Cancel</Button
      >
    </td>
  </tr>
{/each}
