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

<Output {test} {summary}>
  <label class="input-group" style="width: auto; float: left">
    <span>Where</span>
    <input type="text" placeholder="dashboard" class="input input-bordered" />
    <!-- dashboard, or a csv file (where?) or google spreadsheet or -->
  </label>
  <label class="input-group" style="width: auto; float: left">
    <span>Body</span>
    <textarea
      type="text"
      placeholder="info@site.com"
      rows="1"
      class="textarea textarea-bordered"
    />
  </label>
</Output>
