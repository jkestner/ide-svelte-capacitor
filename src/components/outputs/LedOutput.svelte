<script>
  import Output from "./Output.svelte";

  export function summary() {
    return "blink LED";
  }
  function test() {
    console.log("testing LED");
  }
</script>

<Output {test} {summary}>LED out</Output>
