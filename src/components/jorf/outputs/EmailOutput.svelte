<script>
  import Output from "./Output.svelte";
  import VariableInserter from "@components/VariableInserter.svelte";

  export let params = { to: "", content: "" };

  export function summary() {
    return "email@address";
  }
  function test() {
    console.log("testing email to " + params.to);
  }
</script>

<Output {test}>
  <label class="input-group">
    <span>To</span>
    <input
      type="text"
      placeholder="you@site.com"
      class="input input-bordered w-48"
      bind:value={params.to}
    />
  </label>
  <label class="input-group ml-2">
    <span>Content</span>
    <textarea
      type="text"
      rows="1"
      placeholder="content"
      class="textarea textarea-bordered"
      bind:value={params.content}
    />
  </label>
  <!-- <div class="indicator-item pt-6">
      <VariableInserter />
    </div> -->
</Output>
