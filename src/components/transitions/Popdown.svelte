<!-- Popdown.svelte -->
<script>
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  export let refresh = ``;

  let animations = false;
  onMount(
    () =>
      (animations =
        window.matchMedia(`(prefers-reduced-motion: reduce)`) &&
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches !== true)
  );
</script>

{#key refresh}
  {#if animations}
    <div transition:slide={{ duration: 100 }}>
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
{/key}
