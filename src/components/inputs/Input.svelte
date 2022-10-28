<!-- wrapper for all output components -->
<script>
  import Popdown from "@components/transitions/Popdown.svelte";

  export let summary;
  export let sample = undefined; //sample function
</script>

<Popdown>
  <div class="card flex items-stretch grid-cols-1 ml-3">
    <slot />
  </div>

  <div class="card-actions">
    {#if sample}
      <button class="btn btn-outline btn-xs" on:click={sample}>sample</button>
    {/if}
  </div>
</Popdown>
