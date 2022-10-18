<!-- <script>
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
    <div in:fly={{ x: 300, duration: 300 }} out:fade>
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
{/key} -->
<script>
  import { BaseTransition } from "@roxi/routify/decorators";
  import { fade, fly, slide, scale, crossfade } from "svelte/transition";

  const configs = [
    {
      condition: () => true,
      transition: scale,
      inParams: { x: 200, start: 0, duration: 300 },
      outParams: { x: 200, start: 0, duration: 300 },
    },
  ];
</script>

<!-- Transition.svelte -->

<BaseTransition {configs}>
  <slot />
</BaseTransition>
