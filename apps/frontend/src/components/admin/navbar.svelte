<script lang="ts">
  import { goto } from '$app/navigation'
  import { removeSession } from '@/lib/storage'
  import { navigationAdmin } from '@/lib/stores/navigation-admin'
  const onClick = (event: Event) => {
    const { name } = event.target as HTMLButtonElement
    navigationAdmin.set({
      users: false,
      products: false,
      orders: false,
    })

    navigationAdmin.set({
      ...$navigationAdmin,
      [name]: true,
    })
  }

  const logOut = () => {
    removeSession()
    goto('/')
  }
</script>

<div class="bg-gray-200 rounded-lg py-2 flex justify-center px-2">
  <ul class="flex gap-4">
    <li
      class={`font-semibold py-1 px-3 rounded-md ${$navigationAdmin.users ? 'text-black bg-white' : 'text-gray-600'}`}
    >
      <button name="users" on:click={onClick}>Manage Users</button>
    </li>
    <li
      class={`font-semibold py-1 px-3 rounded-md ${$navigationAdmin.products ? 'text-black bg-white' : 'text-gray-600'}`}
    >
      <button name="products" on:click={onClick}>Manage Products</button>
    </li>
    <li
      class={`font-semibold py-1 px-3 rounded-md ${$navigationAdmin.orders ? 'text-black bg-white' : 'text-gray-600'}`}
    >
      <button name="orders" on:click={onClick}>Manage Orders</button>
    </li>
    <li class="font-semibold py-1 px-3 rounded-md text-red-500">
      <button on:click={logOut}>Log Out</button>
    </li>
  </ul>
</div>
