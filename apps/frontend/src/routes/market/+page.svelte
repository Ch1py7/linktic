<script lang="ts">
  import { goto } from '$app/navigation'
  import Navbar from '@/components/market/navbar.svelte'
  import { getSession, removeSession } from '@/lib/storage'
  import { navigationMarket } from '@/lib/stores/navigation-market'
  import { onMount } from 'svelte'

  onMount(() => {
    const { email } = getSession()
    if (email === undefined || email === null) {
      goto('/')
      removeSession()
    }
  })
</script>

<div class="py-5 px-10 flex flex-col gap-5">
  <Navbar />
  {#if $navigationMarket.products}
    <div></div>
  {:else if $navigationMarket.cart}
    <div></div>
  {:else if $navigationMarket.orders}
    <div></div>
  {/if}
</div>
