<script lang="ts">
  import { goto } from '$app/navigation'
  import FormCreateProduct from '@/components/admin/form-create-product.svelte'
  import FormCreateUser from '@/components/admin/users/form-create-user.svelte'
  import Navbar from '@/components/admin/navbar.svelte'
  import Subnavbar from '@/components/admin/subnavbar.svelte'
  import Card from '@/components/card.svelte'
  import { getSession, removeSession } from '@/lib/storage'
  import { navigationAdmin } from '@/lib/stores/navigation-admin'
  import { onMount } from 'svelte'
  import ListUsers from '@/components/admin/users/list-users.svelte'

  onMount(() => {
    const { email } = getSession()
    if (email === undefined || email === null) {
      removeSession()
      goto('/')
    }
  })
</script>

<div class="flex justify-center items-center h-screen">
  <Card>
    <h1 class="text-center text-2xl font-bold mb-4">Admin Panel</h1>
    <Navbar />
    <Subnavbar />
    {#if $navigationAdmin.users.state}
      {#if $navigationAdmin.users.subnavigation.list}
        <ListUsers />
      {/if}
      {#if $navigationAdmin.users.subnavigation.create}
        <FormCreateUser />
      {/if}
    {:else if $navigationAdmin.products.state}
      {#if $navigationAdmin.products.subnavigation.create}
        <div></div>
      {/if}
      {#if $navigationAdmin.products.subnavigation.create}
        <FormCreateProduct />
      {/if}
    {:else if $navigationAdmin.orders.state}
      <div></div>
    {/if}
  </Card>
</div>
