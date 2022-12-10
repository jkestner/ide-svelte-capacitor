<script>
  import Output from "./Output.svelte";
  import VariableInserter from "@components/VariableInserter.svelte";

  export let params = { url: "", method: "POST" };

  export function summary() {
    return "https://yoursite.net";
  }
  function test() {
    console.log("testing HTTP call to " + params.url);
  }
</script>

<Output {test}>
  <label class="input-group ml-2 mb-2">
    <span>Method</span>
    <select type="text" class="select" bind:value={params.method}>
      <option>POST</option>
      <option>GET</option>
    </select>
  </label>
  <label class="input-group ml-2 mb-2">
    <span>URL</span>
    <input
      type="text"
      placeholder="https://yoursite.net"
      class="input input-bordered"
      bind:value={params.url}
    />
  </label>
  <!-- <div class="indicator-item pt-6">
      <VariableInserter />
    </div> -->
</Output>
