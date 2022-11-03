<!-- wrapper for all input components -->
<script>
  import Popdown from "@components/transitions/Popdown.svelte";
  import FaEyeDropper from "svelte-icons/fa/FaEyeDropper.svelte";

  export let sample = undefined; //sample function
</script>

<Popdown>
  <div class="input-group">
    <slot />
    {#if sample}
      <button class="btn btn-ghost w-14" on:click={sample}
        ><FaEyeDropper /></button
      >
    {/if}
  </div>
</Popdown>
