<script>
  import Output from "./Output.svelte";
  import VariableInserter from "@components/VariableInserter.svelte";

  export let params = [];
  let url = "";
  let method = "POST";

  export function summary() {
    return "https://yoursite.net";
  }
  function test() {
    console.log("testing HTTP call to " + url);
  }
</script>

<Output {test} {summary}>
  <div class="form-control indicator">
    <label class="input-group">
      <span>Method</span>
      <select type="text" class="select" bind:value={method}>
        <option>POST</option>
        <option>GET</option>
      </select>
    </label>
  </div>

  <div class="form-control">
    <label class="input-group">
      <span>URL</span>
      <input
        type="text"
        placeholder="https://yoursite.net"
        class="input input-bordered"
        bind:value={url}
      />
    </label>
    <div class="indicator-item pt-6">
      <VariableInserter />
    </div>
  </div>
</Output>
