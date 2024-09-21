<script lang="ts">
  import { goto } from '$app/navigation'
  import { removeSession } from '@/lib/storage'
  import { navigationMarket } from '@/lib/stores/navigation-market'
  import Icon from '@iconify/svelte'

  const onClick = (event: Event) => {
    const { name } = event.target as HTMLButtonElement
    navigationMarket.set({
      products: false,
      orders: false,
      cart: false,
    })

    navigationMarket.set({
      ...$navigationMarket,
      [name]: true,
    })
  }

  const logOut = () => {
    removeSession()
    goto('/')
  }
</script>

<div class="bg-gray-200 rounded-2xl py-2 flex justify-center">
  <ul class="flex justify-center">
    <li
      class={`flex items-center font-semibold py-1 px-3 rounded-md mx-2 ${$navigationMarket.products ? 'text-black bg-white' : 'text-gray-600'}`}
    >
      <button class="flex gap-3" name="products" on:click={onClick}>
        <span class="button-text pointer-events-none">Products</span>
        <span class="pointer-events-none button-icon">
          <Icon height="16px" icon={'bi:bag'} />
        </span>
      </button>
    </li>
    <li
      class={`flex items-center font-semibold py-1 px-3 rounded-md mx-2 ${$navigationMarket.cart ? 'text-black bg-white' : 'text-gray-600'}`}
    >
      <button class="flex gap-3 items-center" name="cart" on:click={onClick}>
        <span class="button-text pointer-events-none">Cart</span>
        <span class="pointer-events-none button-icon">
          <Icon height="16px" icon={'bi:cart'} />
        </span>
      </button>
    </li>
    <li
      class={`flex items-center font-semibold py-1 px-3 rounded-md mx-2 ${$navigationMarket.orders ? 'text-black bg-white' : 'text-gray-600'}`}
    >
      <button class="flex gap-3" name="orders" on:click={onClick}>
        <span class="button-text pointer-events-none">Orders</span>
        <span class="pointer-events-none button-icon">
          <Icon height="16px" icon={'lets-icons:order'} />
        </span>
      </button>
    </li>
    <li class="flex items-center font-semibold py-1 px-3 rounded-md mx-2 text-red-500">
      <button class="flex gap-3" on:click={logOut}>
        <span class="button-text pointer-events-none">Log Out</span>
        <span class="pointer-events-none button-icon">
          <Icon height="16px" icon={'material-symbols:logout'} />
        </span>
      </button>
    </li>
  </ul>
</div>

<style>
  @media (max-width: 500px) {
    .button-text {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .button-icon {
      display: inline;
    }
  }

  @media (min-width: 501px) {
    .button-text {
      display: inline;
    }
  }

  @media (min-width: 501px) {
    .button-icon {
      display: none;
    }
  }
</style>
