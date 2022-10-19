<script>
  import Output from "./Output.svelte";
  import VariableInserter from "@components/VariableInserter.svelte";

  export let params = [];
  let account = "";
  let content = "";

  export function summary() {
    return "tweet";
  }
  function test() {
    console.log("testing tweet from " + account);
  }
</script>

<Output {test} {summary}>
  <div class="form-control">
    <label class="input-group">
      <span>Account</span>
      <input
        type="text"
        placeholder="@supermechanical"
        class="input input-bordered"
        bind:value={account}
      />
    </label>
  </div>

  <div class="form-control indicator">
    <label class="input-group">
      <span>Tweet</span>
      <textarea
        type="text"
        placeholder="tweet"
        class="textarea textarea-bordered"
        bind:value={content}
      />
    </label>
    <div class="indicator-item pt-6">
      <VariableInserter />
    </div>
  </div>
</Output>
