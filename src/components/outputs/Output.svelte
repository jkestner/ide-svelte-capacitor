<!-- wrapper for all output components -->
<script>
  import Popdown from "@components/transitions/Popdown.svelte";

  export let summary;
  export let test;
</script>

<Popdown>
  <div
    class="card flex items-stretch bg-accent p-1 mb-2 rounded-xl grid-cols-1 ml-3"
  >
    <slot />
  </div>

  <div class="card-actions">
    <button class="btn btn-outline btn-xs" on:click={test}>test</button>
  </div>
</Popdown>
