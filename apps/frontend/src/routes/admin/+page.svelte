<script lang="ts">
  import { goto } from '$app/navigation'
  import FormCreateUser from '@/components/admin/form-create-user.svelte'
  import Navbar from '@/components/admin/navbar.svelte'
  import Card from '@/components/card.svelte'
  import { getSession, removeSession } from '@/lib/storage'
  import { navigationAdmin } from '@/lib/stores/navigation-admin'
  import { onMount } from 'svelte'

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
    {#if $navigationAdmin.users}
      <FormCreateUser />
    {:else if $navigationAdmin.products}
      <div></div>
    {:else if $navigationAdmin.orders}
      <div></div>
    {/if}
  </Card>
</div>
