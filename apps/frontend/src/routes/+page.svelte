<script lang="ts">
  import { goto } from '$app/navigation'
  import { Button, Card } from '@/components'
  import { login } from '@/lib/http-client/auth'
  import { setSession } from '@/lib/storage'

  let credentials: Omit<User, 'name'> = {
    email: '',
    password: '',
    role: 'user',
  }

  let errors: string[] = []

  const onSumbit = async () => {
    try {
      const { data } = await login(credentials)
      setSession(data)
      data.role === 'admin' && goto('/admin')
      data.role === 'user' && goto('/market')
    } catch (e) {
      const error = e as string[]
      errors = error
    }
  }
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
  <Card style={'w-64'}>
    <h2 class="text-2xl font-semibold">Log In</h2>
    {#if errors.length > 0}
      <div>
        {#each errors as error}
          <p class="text-red-500 font-semibold text-ellipsis">{error}</p>
        {/each}
      </div>
    {/if}
    <form on:submit|preventDefault={onSumbit} class="flex flex-col gap-3">
      <input
        bind:value={credentials.email}
        placeholder="Email"
        id="email"
        class="border border-1 border-solid border-gray-400 rounded-md px-2 py-1"
      />
      <input
        type="password"
        bind:value={credentials.password}
        placeholder="Password"
        id="password"
        class="border border-1 border-solid border-gray-400 rounded-md px-2 py-1"
      />
      <select
        bind:value={credentials.role}
        style="appearance: none;"
        class="border border-1 border-solid border-gray-400 rounded-md px-2 py-1 w-full"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <Button type={'submit'} style={'bg-black text-white py-2 mt-3'}>Sign in</Button>
      <a class="text-center" href="/register">Create account</a>
    </form>
  </Card>
</div>
