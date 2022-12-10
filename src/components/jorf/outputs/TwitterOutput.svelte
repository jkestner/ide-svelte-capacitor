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

<Output {test}>
  <label class="input-group ml-2 mb-2">
    <span>Account</span>
    <input
      type="text"
      placeholder="@supermechanical"
      class="input input-bordered w-48"
      bind:value={params.account}
    />
  </label>
  <label class="input-group ml-2 mb-2">
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
