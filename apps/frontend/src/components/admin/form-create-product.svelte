<script lang="ts">
  import Button from '@/components/button.svelte'
  import { numberValidator } from '@/lib'
  import { create } from '@/lib/http-client/products'
  import Icon from '@iconify/svelte'

  let loading = false
  let productCreated = ''
  let imagePreview: string | null = null
  let errors: string[] = []
  let product: Product = {
    title: '',
    description: '',
    price: 0,
    image: '',
  }

  const onInput = (event: Event) => {
    const { value, name } = event.target as HTMLInputElement
    product = {
      ...product,
      [name]: value,
    }
  }

  const imageHandler = (event: Event) => {
    const { target } = event as ChangeEvent
    const image = target.files?.[0]
    if (image) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }

      imagePreview = URL.createObjectURL(image)

      product = {
        ...product,
        image: imagePreview,
      }
    }
  }

  const onSubmit = async () => {
    try {
      loading = true
      errors = []
      const { status } = await create(product)
      if (status === 201) {
        product = {
          description: '',
          image: '',
          price: 0,
          title: '',
        }

        productCreated = 'Product created successfully'
      }
    } catch (e) {
      const formErrors = e as string[]
      errors = formErrors
    } finally {
      loading = false

      setTimeout(() => {
        productCreated = ''
      }, 3000)
    }
  }
</script>

<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-2">
  {#if errors.length > 0}
    <div>
      {#each errors as error}
        <p class="text-red-500 font-semibold text-ellipsis">{error}</p>
      {/each}
    </div>
  {/if}
  {#if productCreated !== ''}
    <p class="text-green-500 text-ellipsis">{productCreated}</p>
  {/if}
  <div class="flex flex-col items-center">
    {#if product.image}
      <div
        style={`background: url(${product.image}); background-size: cover; background-repeat: no-repeat; aspect-ratio: 1 / 1;`}
        class="rounded-xl h-72 w-72 mb-10"
      ></div>
    {/if}
    <div>
      <label for="image">
        <Icon
          icon="material-symbols:add-a-photo-outline"
          style="height: 3rem; width: 3rem; cursor: pointer;"
        />
      </label>
      <input
        accept=".png, .jpg, .jpeg"
        type="file"
        id="image"
        name="image"
        on:input={imageHandler}
        class="hidden"
      />
    </div>
  </div>
  <div class="flex flex-col gap-1">
    <label class="font-semibold" for="title">Product Name</label>
    <input
      on:input={onInput}
      class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2"
      placeholder="Product name"
      value={product.title}
      type="text"
      id="title"
      name="title"
    />
  </div>
  <div class="flex flex-col gap-1">
    <label class="font-semibold" for="price">Price</label>
    <input
      on:input={(e) => {
        const onlyNumbers = numberValidator(e)
        product.price = onlyNumbers
      }}
      class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2"
      placeholder="Price"
      value={product.price === 0 ? '' : product.price}
      type="text"
      id="price"
      name="price"
      inputmode="numeric"
    />
  </div>
  <div class="flex flex-col gap-1">
    <label class="font-semibold" for="description">Description</label>
    <input
      on:input={onInput}
      class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2"
      placeholder="Description"
      value={product.description}
      type="text"
      id="description"
      name="description"
    />
  </div>
  <Button
    disabled={loading}
    type={'submit'}
    style={`py-2 mt-3 ${loading ? 'bg-gray-400 text-black' : 'bg-black text-white'}`}
  >
    Create Product
  </Button>
</form>
