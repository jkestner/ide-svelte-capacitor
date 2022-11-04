<script>
  import Literal from "@components/jorf/Literal.svelte";
  import Input from "./Input.svelte";

  export let value;

  export function summary() {
    return "light " + value;
  }
  function sample() {
    console.log("sampling light level");
  }
</script>

<Input {sample}>
  <Literal bind:value autocomplete />
</Input>
