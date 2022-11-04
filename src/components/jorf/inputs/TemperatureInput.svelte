<script>
  import Input from "./Input.svelte";
  import Literal from "@components/jorf/Literal.svelte";

  export let value;

  export function summary() {
    return "temperature " + value;
  }
  function sample() {
    console.log("sampling temperature");
  }
</script>

<Input {sample}>
  <Literal bind:value autocomplete />
</Input>
