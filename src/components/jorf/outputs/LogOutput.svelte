<script>
  import Output from "./Output.svelte";

  export let params = {};

  export function summary() {
    return "temp, light";
  }
  function test() {
    console.log("testing log");
  }
</script>

<Output {test}>
  <label class="input-group ml-2 mb-2">
    <span>Where</span>
    <input
      type="text"
      placeholder="dashboard"
      class="input input-bordered w-48"
    />
    <!-- dashboard, or a csv file (where?) or google spreadsheet or -->
  </label>
  <label class="input-group ml-2 mb-2">
    <span>Body</span>
    <textarea
      type="text"
      placeholder="info@site.com"
      rows="1"
      class="textarea textarea-bordered"
    />
  </label>
</Output>
