<script lang="ts">
  import { navigationAdmin } from '@/lib/stores/navigation-admin'

  const onClick = (event: Event) => {
    const { name } = event.target as HTMLButtonElement
    const [main, sub] = name.split(',') as [main: 'users' | 'products' | 'orders', sub: string]

    navigationAdmin.set({
      users: {
        state: false,
        subnavigation: {
          create: false,
          list: false,
        },
      },
      products: {
        state: false,
        subnavigation: {
          create: false,
          list: false,
        },
      },
      orders: {
        state: false,
      },
    })

    navigationAdmin.set({
      ...$navigationAdmin,
      [main]: {
        state: true,
        subnavigation: {
          [sub]: true,
        },
      },
    })
  }
</script>

{#if $navigationAdmin.users.state}
  <div class="bg-gray-200 rounded-lg py-2 flex justify-center px-2">
    <ul class="flex gap-4">
      <li
        class={`font-semibold py-1 px-3 rounded-md ${$navigationAdmin.users.subnavigation.list ? 'text-black bg-white' : 'text-gray-600'}`}
      >
        <button name="users,list" on:click={onClick}>List Users</button>
      </li>
      <li
        class={`font-semibold py-1 px-3 rounded-md ${$navigationAdmin.users.subnavigation.create ? 'text-black bg-white' : 'text-gray-600'}`}
      >
        <button name="users,create" on:click={onClick}>Create User</button>
      </li>
    </ul>
  </div>
{/if}
{#if $navigationAdmin.products.state}
  <div class="bg-gray-200 rounded-lg py-2 flex justify-center px-2">
    <ul class="flex gap-4">
      <li
        class={`font-semibold py-1 px-3 rounded-md ${$navigationAdmin.products.subnavigation.list ? 'text-black bg-white' : 'text-gray-600'}`}
      >
        <button name="products,list" on:click={onClick}>List Products</button>
      </li>
      <li
        class={`font-semibold py-1 px-3 rounded-md ${$navigationAdmin.products.subnavigation.create ? 'text-black bg-white' : 'text-gray-600'}`}
      >
        <button name="products,create" on:click={onClick}>Create Product</button>
      </li>
    </ul>
  </div>
{/if}
{#if $navigationAdmin.orders.state}
  <div class="bg-gray-200 rounded-lg py-2 flex justify-center px-2">
    <ul class="flex gap-4">
      <li
        class={`font-semibold py-1 px-3 rounded-md ${$navigationAdmin.orders.state ? 'text-black bg-white' : 'text-gray-600'}`}
      >
        <button name="orders,list" on:click={onClick}>List</button>
      </li>
    </ul>
  </div>
{/if}
