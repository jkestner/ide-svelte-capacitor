<script>
  import Output from "./Output.svelte";

  export let params = { to: "", content: "" };

  export function summary() {
    return "SMS";
  }
  function test() {
    console.log("testing SMS to " + params.to);
  }
</script>

<Output {test}>
  <label class="input-group ml-2 mb-2">
    <span>To</span>
    <input
      type="text"
      placeholder="512-555-1111"
      class="input input-bordered w-36"
      bind:value={params.to}
      on:blur={test}
    />
  </label>
  <label class="input-group ml-2 mb-2">
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
