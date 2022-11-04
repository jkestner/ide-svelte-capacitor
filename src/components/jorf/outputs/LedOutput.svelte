<script>
  import Output from "./Output.svelte";

  export let position = 1;
  export let value = "#ffffff";

  export function summary() {
    return "blink LED";
  }
  function test() {
    console.log("testing LED");
  }
</script>

<Output {test}>
  <label class="input-group">
    <span>Position</span>
    <input
      type="number"
      class="input input-bordered w-16"
      bind:value={position}
      on:blur={test}
    />
  </label>
  <label class="input-group ml-2">
    <span>Color</span>
    <input
      type="color"
      class="input input-bordered w-16"
      bind:value
      on:blur={test}
    />
  </label>
</Output>
