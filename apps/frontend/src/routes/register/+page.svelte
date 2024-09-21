<script lang="ts">
  import { goto } from '$app/navigation'
  import { Button, Card } from '@/components'
  import { register } from '@/lib/http-client/auth'

  let credentials: User = {
    name: '',
    email: '',
    password: '',
    role: 'user',
  }

  let errors: string[] = []

  const onSumbit = async () => {
    try {
      const { status } = await register(credentials)
      if (status === 201) goto('/')
    } catch (e) {
      const error = e as string[]
      errors = error
    }
  }
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
  <Card style={'w-64'}>
    <h2 class="text-2xl font-semibold">Sign Up</h2>
    {#if errors.length > 0}
      <div>
        {#each errors as error}
          <p class="text-red-500">{error}</p>
        {/each}
      </div>
    {/if}
    <form on:submit|preventDefault={onSumbit} class="flex flex-col gap-3">
      <input
        bind:value={credentials.name}
        placeholder="Name"
        id="name"
        class="border border-1 border-solid border-gray-400 rounded-md px-2 py-1"
      />
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
      <Button type={'submit'} style={'bg-black text-white py-2 mt-3'}>Sign up</Button>
      <div class="flex flex-col">
        <p class="text-center">Already have an account?</p>
        <a class="text-center font-semibold" href="/">Log in</a>
      </div>
    </form>
  </Card>
</div>
