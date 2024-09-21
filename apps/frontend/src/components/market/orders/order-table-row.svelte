<script lang="ts">
  import Button from '@/components/button.svelte'

  export let orders: Orders[] = []
</script>

{#each orders as order, index (index)}
  <tr>
    <td class="ps-2 py-1">
      <p>{order.order_id}</p>
    </td>
    <td class="ps-2 py-1 text-end text-xl">
      {#each order.order_products as product, index (index)}
        {product.title}
        {product.quantity}
        {product.product_id}
      {/each}
    </td>
    <td class="ps-2 py-1 text-end">
      <p>
        {order.status}
      </p>
    </td>
    <td class="ps-2 py-1 text-end"> </td>
    <td class="ps-2 py-1 text-center">
      <Button
        style={'text-red-600 font-semibold border border-1 border-solid border-gray px-5'}
        on:click={() => {}}>Cancelar</Button
      >
    </td>
  </tr>
{/each}
