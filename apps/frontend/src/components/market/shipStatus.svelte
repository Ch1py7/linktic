<script lang="ts">
  export let status = false
</script>

<p class={`${status ? 'bg-green-600' : 'bg-yellow-400'} rounded-md inline px-3 py-1`}>
  {status ? 'shipped' : 'pending'}
</p>
