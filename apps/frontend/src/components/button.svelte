<script lang="ts">
  export let style: string
  export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button'
  export let disabled = false
</script>

<button {disabled} {type} on:click class={`${style} py-1 px-2 rounded-lg bottom-0`}>
  <slot />
</button>
