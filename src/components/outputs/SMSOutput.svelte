<script>
  import Output from "./Output.svelte";

  export let value = null;
  export let params = { to: "", content: "" };

  export function summary() {
    return "SMS";
  }
  function test() {
    console.log("testing SMS to " + params.to);
  }
</script>

<Output {test} {summary}>
  <label class="input-group" style="width: auto; float: left">
    <span>To</span>
    <input
      type="text"
      placeholder="512-555-1111"
      class="input input-bordered"
      bind:value={params.to}
      on:blur={test}
    />
  </label>
  <label class="input-group" style="width: auto; float: left">
    <span>Content</span>
    <textarea
      type="text"
      rows="1"
      placeholder="content"
      class="textarea textarea-bordered"
      bind:value={params.content}
      on:blur={test}
    />
  </label>
</Output>
