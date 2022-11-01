<!-- wrapper for all output components -->
<script>
  import Popdown from "@components/transitions/Popdown.svelte";

  export let summary;
  export let test = undefined; //test function
  export let parameters = {};
</script>

<Popdown>
  <!-- <div class="card flex items-stretch grid-cols-1 ml-3"> -->
  <slot />
  <!-- </div> -->

  <div class="card-actions">
    {#if test}
      <button class="btn btn-outline btn-xs" on:click={test}>test</button>
    {/if}
  </div>
</Popdown>
