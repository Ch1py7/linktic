<script lang="ts">
  export let style: string
  export let type: "button" | "reset" | "submit" | null | undefined = "button"
</script>

<button type={type} on:click class={`${style} py-1 px-2 rounded-lg bottom-0`}>
  <slot />
</button>
