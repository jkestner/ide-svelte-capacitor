<script>
  import Input from "./Input.svelte";
  import Literal from "@components/Literal.svelte";

  export let value = 72;

  export function summary() {
    return "temperature " + value;
  }
  function sample() {
    console.log("sampling temperature");
  }
</script>

<Input {summary} {sample}>
  temperature range slider, f/c, etc
  <Literal bind:value />
</Input>
