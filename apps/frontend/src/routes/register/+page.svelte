<script lang="ts">
  import { Button, Card } from '@/components'

  let credentials: UserRegister = {
    email: '',
    password: '',
    role: 'user',
  }
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
  <Card>
    <h2 class="text-2xl font-semibold">Sign Up</h2>
    <form on:submit|preventDefault={() => {}} class="flex flex-col gap-3">
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
      <Button type={'submit'} style={'bg-black text-white py-2 mt-3'}>Sign up</Button>
      <div class="flex flex-col">
        <p class="text-center">Already have an account?</p>
        <a class="text-center font-semibold" href="/">Log in</a>
      </div>
    </form>
  </Card>
</div>
