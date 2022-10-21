<!-- wrapper for all output components -->
<script>
  import Popdown from "@components/transitions/Popdown.svelte";

  export let summary;
  export let read = undefined;
</script>

<Popdown>
  <div class="card flex items-stretch grid-cols-1 ml-3">
    <slot />
  </div>

  <div class="card-actions">
    {#if read}
      <button class="btn btn-outline btn-xs" on:click={read}>read</button>
    {/if}
  </div>
</Popdown>
