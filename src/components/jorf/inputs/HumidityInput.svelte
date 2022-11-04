<script>
  import Literal from "@components/jorf/Literal.svelte";
  import Input from "./Input.svelte";

  export let value = 0;

  export function summary() {
    return "humidity " + value;
  }
  function sample() {
    console.log("sampling humdity");
  }
</script>

<Input {sample}>
  <Literal bind:value autocomplete />
</Input>
