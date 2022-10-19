<script>
  import Output from "./Output.svelte";
  import VariableInserter from "@components/VariableInserter.svelte";

  export let params = [];
  let to = "";
  let body = "";

  export function summary() {
    return "email@address";
  }
  function test() {
    console.log("testing email to " + to);
  }
</script>

<Output {test} {summary}>
  <div class="form-control">
    <label class="input-group">
      <span>To</span>
      <input
        type="text"
        placeholder="you@site.com"
        class="input input-bordered"
        bind:value={to}
      />
    </label>
  </div>

  <div class="form-control indicator">
    <label class="input-group">
      <span>Body</span>
      <textarea
        type="text"
        placeholder="body"
        class="textarea textarea-bordered"
        bind:value={body}
      />
    </label>
    <div class="indicator-item pt-6">
      <VariableInserter />
    </div>
  </div>
</Output>
