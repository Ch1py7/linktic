<script lang="ts">
  export let style = ''
</script>

<div
  class={`bg-white border border-1 border-solid border-gray rounded-md shadow-lg py-5 px-6 grid gap-6 ${style}`}
>
  <slot />
</div>
