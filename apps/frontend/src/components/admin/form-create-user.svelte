<script lang="ts">
  import Button from '@/components/button.svelte'
  import { register } from '@/lib/http-client/auth'

  let loading = false
  let userCreated = ''
  let user: User = {
    name: '',
    email: '',
    password: '',
    role: 'user',
  }

  let errors: string[] = []

  const onInput = (event: Event) => {
    errors = []
    const { value, name } = event.target as HTMLInputElement

    user = {
      ...user,
      [name]: value,
    }
  }

  const onSubmit = async () => {
    try {
      loading = true
      errors = []
      const { status } = await register(user)
      if (status === 201) {
        user = {
          name: '',
          email: '',
          password: '',
          role: 'user',
        }

        userCreated = 'User created successfully'
      }
    } catch (e) {
      const formErrors = e as string[]
      errors = formErrors
    } finally {
      loading = false

      setTimeout(() => {
        userCreated = ''
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
  {#if userCreated !== ''}
    <p class="text-green-500 text-ellipsis">{userCreated}</p>
  {/if}
  <div class="flex flex-col gap-1">
    <label class="font-semibold" for="name">Name</label>
    <input
      on:input={onInput}
      class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2"
      placeholder="Name"
      value={user.name}
      type="text"
      id="name"
      name="name"
    />
  </div>
  <div class="flex flex-col gap-1">
    <label class="font-semibold" for="email">Email</label>
    <input
      on:input={onInput}
      class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2"
      placeholder="Email"
      value={user.email}
      type="text"
      id="email"
      name="email"
    />
  </div>
  <div class="flex flex-col gap-1">
    <label class="font-semibold" for="password">Password</label>
    <input
      type="password"
      on:input={onInput}
      class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2"
      placeholder="password"
      value={user.password}
      id="password"
      name="password"
    />
  </div>
  <div class="flex flex-col gap-1">
    <label class="font-semibold" for="role">Role</label>
    <select
      on:change={onInput}
      style="appearance: none;"
      class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2"
      value={user.role}
      id="role"
      name="role"
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  </div>
  <Button
    disabled={loading}
    type={'submit'}
    style={`py-2 mt-3 ${loading ? 'bg-gray-400 text-black' : 'bg-black text-white'}`}
  >
    Create User
  </Button>
</form>
