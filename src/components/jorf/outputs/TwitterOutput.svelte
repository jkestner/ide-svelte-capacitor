<script>
  import Output from "./Output.svelte";

  export let params = { account: "", content: "" };

  export function summary() {
    return "tweet";
  }
  function test() {
    console.log("testing tweet from " + params.account);
  }
</script>

<Output {test} {summary}>
  <label class="input-group" style="width: auto; float: left">
    <span>Account</span>
    <input
      type="text"
      placeholder="@supermechanical"
      class="input input-bordered"
      bind:value={params.account}
    />
  </label>
  <label class="input-group" style="width: auto; float: left">
    <label class="input-group">
      <span>Tweet</span>
      <textarea
        type="text"
        rows="1"
        placeholder="tweet"
        class="textarea textarea-bordered"
        bind:value={params.content}
      />
    </label>
  </label></Output
>
