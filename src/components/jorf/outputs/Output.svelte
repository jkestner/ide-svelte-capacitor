<!-- wrapper for all output components -->
<script>
  import Popdown from "@components/transitions/Popdown.svelte";
  import FaCompressArrowsAlt from "svelte-icons/fa/FaCompressArrowsAlt.svelte";

  export let test = undefined; //test function
  export let parameters = {};
</script>

<Popdown>
  <div class="input-group">
    <slot />
    {#if test}
      <button class="btn btn-ghost w-14" on:click={test}
        ><FaCompressArrowsAlt /></button
      >
    {/if}
  </div>
</Popdown>
