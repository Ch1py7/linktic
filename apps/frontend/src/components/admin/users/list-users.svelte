<script lang="ts">
  import Card from '@/components/card.svelte'
  import { listUsers } from '@/lib/http-client/users'
  import { onMount } from 'svelte'
  import UserTableRow from './user-table-row.svelte'

  let users: AllUsers[]
  let userDeleted = ''
  let userUpdated = ''

  const list = async () => {
    const { data, status } = await listUsers()
    if (status === 200) {
      users = data.map((d) => {
        return {
          ...d,
          edit: false,
        }
      })
    }
  }

  onMount(() => {
    list()
  })
</script>

<Card>
  <h2 class="text-2xl font-bold mb-5">Users</h2>
  {#if userDeleted !== ''}
    <p class="text-green-500 text-ellipsis">{userDeleted}</p>
  {/if}
  {#if userUpdated !== ''}
    <p class="text-green-500 text-ellipsis">{userUpdated}</p>
  {/if}
  <table class="w-full">
    <thead>
      <tr class="border-b border-b-1 border-solid border-gray">
        <th class="ps-2 pb-3">
          <p class="font-semibold text-start text-gray-600">ID</p>
        </th>
        <th class="ps-2 pb-3 w-72">
          <p class="font-semibold text-center text-gray-600">Name</p>
        </th>
        <th class="ps-2 pb-3 w-60">
          <p class="font-semibold text-center text-gray-600">Role</p>
        </th>
        <th class="ps-2 pb-3 w-60"></th>
      </tr>
    </thead>
    <tbody>
      <UserTableRow bind:userDeleted bind:userUpdated {users} />
    </tbody>
  </table>
</Card>
