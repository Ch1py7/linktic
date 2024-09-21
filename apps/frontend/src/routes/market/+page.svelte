<script lang="ts">
  import { goto } from '$app/navigation'
  import CartTable from '@/components/market/cart/cart-table.svelte'
  import Navbar from '@/components/market/navbar.svelte'
  import OrdersTable from '@/components/market/orders/orders-table.svelte'
  import ProductVisualizer from '@/components/market/products/product-visualizer.svelte'
  import { getCart, getSession, removeSession } from '@/lib/storage'
  import { navigationMarket } from '@/lib/stores/navigation-market'
  import { manageTotals } from '@/lib/utils'
  import { onMount } from 'svelte'

  onMount(() => {
    const { email } = getSession()

    const cart = getCart()
    manageTotals(cart)
    if (email === undefined || email === null) {
      goto('/')
      removeSession()
    }
  })
</script>

<div class="py-5 px-10 flex flex-col gap-5">
  <Navbar />
  {#if $navigationMarket.products}
    <ProductVisualizer />
  {:else if $navigationMarket.cart}
    <CartTable />
  {:else if $navigationMarket.orders}
    <OrdersTable />
  {/if}
</div>
