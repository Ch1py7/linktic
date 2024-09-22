<script lang="ts">
  import Button from '@/components/button.svelte'
  import { deleteUser, listUsers, updateUser } from '@/lib/http-client/users'
  import Icon from '@iconify/svelte'

  export let users: AllUsers[] = []
  export let userDeleted = ''
  export let userUpdated = ''
  let errors = []

  const onInput = (event: Event, index: number) => {
    const { name, value } = event.target as HTMLInputElement
    users[index] = { ...users[index], [name]: value }
  }

  const toggleEdit = (index: number) => {
    users[index].edit = !users[index].edit
  }

  const delete_ = async (id: number) => {
    try {
      const { status } = await deleteUser(id)
      if (status === 200) {
        userDeleted = 'user deleted successfully'
      }
    } catch (e) {
      const formErrors = e as string[]
      errors = formErrors
    } finally {
      setTimeout(() => {
        userDeleted = ''
      }, 3000)

      const { data } = await listUsers()
      users = data.map((d) => {
        return {
          ...d,
          edit: false,
        }
      })
    }
  }

  const update = async (user: AllUsers, index: number) => {
    try {
      const { status } = await updateUser({ id: user.id, name: user.name, role: user.role })
      if (status === 200) {
        userUpdated = 'user updated successfully'
        users[index].edit = false
      }
    } catch (e) {
      const formErrors = e as string[]
      errors = formErrors
    } finally {
      setTimeout(() => {
        userUpdated = ''
      }, 3000)

      const { data } = await listUsers()
      users = data.map((d) => {
        return {
          ...d,
          edit: false,
        }
      })
    }
  }
</script>

{#each users as user, index (index)}
  <tr>
    <td class="ps-2 py-1 text-start text-xl">
      <p>{user.id}</p>
    </td>
    <td class="ps-2 py-1 text-center">
      <input
        disabled={!user.edit}
        on:input={(e) => onInput(e, index)}
        name="name"
        class="border border-1 border-solid border-gray-400 rounded-md py-1 px-2 text-center"
        value={user.name}
      />
    </td>
    <td class="ps-2 py-1 text-end">
      <select
        disabled={!user.edit}
        on:input={(e) => onInput(e, index)}
        name="role"
        value={user.role}
        style="appearance: none;"
        class="border border-1 border-solid border-gray-400 rounded-md px-2 py-1 w-full"
      >
        <option value="user" class="text-end">User</option>
        <option value="admin" class="text-end">Admin</option>
      </select>
    </td>
    <td class="ps-2 py-1 text-center">
      {#if user.name !== 'admin'}
        {#if user.edit}
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
        {#if user.edit}
          <Button
            style={'text-red-600 font-semibold border border-1 border-solid border-gray px-5'}
            on:click={() => update(user, index)}
          >
            <Icon height="1.4rem" icon={'ic:baseline-check'} />
          </Button>
        {:else}
          <Button
            style={'text-red-600 font-semibold border border-1 border-solid border-gray px-5'}
            on:click={() => delete_(user.id)}
          >
            <Icon height="1.4rem" icon={'ph:trash'} />
          </Button>
        {/if}
      {/if}
    </td>
  </tr>
{/each}
