<script lang="ts">
  import Button from '@/components/button.svelte'
  import { cancelOrder, listOrders, updateOrder } from '@/lib/http-client/orders'

  export let orders: Orders[] = []

  const cancel = async (id: number) => {
    const { status } = await cancelOrder(id)

    if (status === 200) {
      const { data } = await listOrders()
      orders = data
    }
  }

  const sendOrder = async (id: number) => {
    const { status } = await updateOrder(id)
    if (status === 200) {
      const { data } = await listOrders()
      orders = data
    }
  }
</script>

{#each orders as order, index (index)}
  <tr class={`${index % 2 && 'bg-gray-100'}`}>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-center text-xl">
      <p class="text-center">{order.order_id}</p>
    </td>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-center text-xl">
      {#each order.order_products as product, index (index)}
        <p class="font-semibold">
          {product.title}
        </p>
      {/each}
    </td>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-center text-xl">
      {#each order.order_products as product, index (index)}
        <p class="text-center">
          {product.quantity}
        </p>
      {/each}
    </td>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-center">
      <select
        on:input={(e) => {}}
        disabled
        name="status"
        value={order.status ? 'true' : 'false'}
        style="appearance: none;"
        class="border border-1 border-solid border-gray-400 rounded-md px-2 py-1 w-full"
      >
        <option value="false" class="text-en">Pending</option>
        <option value="true" class="text-end">Shipping</option>
      </select>
    </td>
    <td class="border-solid border-b-1 border-b border-bray-300 ps-2 py-2 text-center">
      <div class="flex flex-col gap-2 px-10">
        {#if !order.status}
          <Button
            style={`text-green-600 font-semibold border border-1 border-solid ${index % 2 && 'border-gray-300'} px-5`}
            on:click={() => sendOrder(order.order_id)}>Send</Button
          >
          <Button
            style={`text-red-600 font-semibold border border-1 border-solid ${index % 2 && 'border-gray-300'} px-5`}
            on:click={() => cancel(order.order_id)}>Cancel</Button
          >
        {/if}
      </div>
    </td>
  </tr>
{/each}
