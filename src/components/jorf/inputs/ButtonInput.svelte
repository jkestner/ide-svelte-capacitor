<script>
  import Literal from "@components/jorf/Literal.svelte";
  import Input from "./Input.svelte";

  export let position = 1;
  export let value = 0;

  export function summary() {
    return "button " + position;
  }
  function sample() {
    console.log("sampling button ", position);
  }
</script>

<Input {sample}>
  <Literal bind:value autocomplete vocabulary={opMenu} />
</Input>
