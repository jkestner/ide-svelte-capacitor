<script>
  let variables = ["temp", "light", "voltage", "date"];

  function insert(value) {
    console.log(value.target.value);
  }
</script>

<div class="tags">
  {#each variables as variable}
    <button
      class="btn btn-xs btn-primary mx-1"
      value={variable}
      on:click={insert}>{variable}</button
    >
  {/each}
</div>
