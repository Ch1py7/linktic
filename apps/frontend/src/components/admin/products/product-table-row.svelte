<script lang="ts">
  import Button from '@/components/button.svelte'
  import { deleteProduct, listProducts, updateProduct } from '@/lib/http-client/products'
  import Icon from '@iconify/svelte'

  export let products: AllProducts[] = []
  export let productDeleted = ''
  export let productUpdated = ''
  let errors = []

  const onInput = (event: Event, index: number) => {
    const { name, value } = event.target as HTMLInputElement
    products[index] = { ...products[index], [name]: value }
  }

  const toggleEdit = (index: number) => {
    products[index].edit = !products[index].edit
  }

  const delete_ = async (id: number) => {
    try {
      const { status } = await deleteProduct(id)
      if (status === 200) {
        productDeleted = 'product deleted successfully'
      }
    } catch (e) {
      const formErrors = e as string[]
      errors = formErrors
    } finally {
      setTimeout(() => {
        productDeleted = ''
      }, 3000)

      const { data } = await listProducts()
      products = data.map((d) => {
        return {
          ...d,
          edit: false,
        }
      })
    }
  }

  const update = async (product: AllProducts, index: number) => {
    try {
      const { status } = await updateProduct(product)
      if (status === 200) {
        productUpdated = 'product updated successfully'
        products[index].edit = false
      }
    } catch (e) {
      const formErrors = e as string[]
      errors = formErrors
    } finally {
      setTimeout(() => {
        productUpdated = ''
      }, 3000)

      const { data } = await listProducts()
      products = data.map((d) => {
        return {
          ...d,
          edit: false,
        }
      })
    }
  }
</script>

{#each products as product, index (index)}
  <tr>
    <td class="ps-2 py-1 text-start text-xl">
      <p>{product.id}</p>
    </td>
    <td class="ps-2 py-1 text-center">
      <input
        disabled={!product.edit}
        on:input={(e) => onInput(e, index)}
        name="title"
        class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2 text-center"
        value={product.title}
      />
    </td>
    <td class="ps-2 py-1 text-center">
      <input
        disabled={!product.edit}
        on:input={(e) => onInput(e, index)}
        name="description"
        class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2 text-center"
        value={product.description}
      />
    </td>
    <td class="ps-2 py-1 text-end">
      <input
        disabled={!product.edit}
        on:input={(e) => onInput(e, index)}
        name="price"
        class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2 text-center"
        value={product.price}
      />
    </td>
    <td class="ps-2 py-1 text-center">
      {#if product.edit}
        <Button
          style={'text-red-600 font-semibold border border-1 border-solid border-gray px-5'}
          on:click={() => toggleEdit(index)}
        >
          <Icon height="1.4rem" icon={'radix-icons:cross-2'} />
        </Button>
      {:else}
        <Button
          style={'text-blue-600 font-semibold border border-1 border-solid border-gray px-5'}
          on:click={() => toggleEdit(index)}
        >
          <Icon height="1.4rem" icon={'lucide:edit'} />
        </Button>
      {/if}
      {#if product.edit}
        <Button
          style={'text-red-600 font-semibold border border-1 border-solid border-gray px-5'}
          on:click={() => update(product, index)}
        >
          <Icon height="1.4rem" icon={'ic:baseline-check'} />
        </Button>
      {:else}
        <Button
          style={'text-red-600 font-semibold border border-1 border-solid border-gray px-5'}
          on:click={() => delete_(product.id)}
        >
          <Icon height="1.4rem" icon={'ph:trash'} />
        </Button>
      {/if}
    </td>
  </tr>
{/each}
