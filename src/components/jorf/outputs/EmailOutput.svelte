<script>
  import Output from "./Output.svelte";
  import VariableInserter from "@components/VariableInserter.svelte";
  import FaCompressArrowsAlt from "svelte-icons/fa/FaCompressArrowsAlt.svelte";

  export let params = { to: "", content: "" };

  export function summary() {
    return "email@address";
  }
  function test() {
    console.log("testing email to " + params.to);
  }
</script>

<Output {test}>
  <label class="input-group ml-2 mb-2">
    <span>To</span>
    <input
      type="text"
      placeholder="you@site.com"
      class="input input-bordered w-48"
      bind:value={params.to}
    />
  </label>
  <label class="input-group ml-2 mb-2">
    <span>Content</span>
    <textarea
      type="text"
      rows="1"
      placeholder="content"
      class="textarea textarea-bordered rounded-none"
      bind:value={params.content}
    />
    {#if test}
      <button class="btn w-14" alt="insert?" on:click={test}
        ><FaCompressArrowsAlt /></button
      >
    {/if}
  </label>
  <!-- <div class="indicator-item pt-6">
      <VariableInserter />
    </div> -->
</Output>
