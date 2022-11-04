<script>
  import Output from "./Output.svelte";
  import Literal from "@components/jorf/Literal.svelte";

  export let to = 1;
  export let value = "high";
  export function summary() {
    return "send " + value + " to " + to;
  }
  function test() {
    console.log("testing pin " + to + " set to " + value);
  }
</script>

<Output>
  <label class="input-group">
    <span>Address</span>
    <input
      type="number"
      placeholder="512-555-1111"
      class="input input-bordered w-16"
      bind:value={to}
      on:blur={test}
    />
  </label>
  <label class="input-group ml-2">
    <span>Value</span>
    <input
      type="number"
      class="input input-bordered w-16"
      bind:value
      on:blur={test}
    />
  </label>
</Output>
