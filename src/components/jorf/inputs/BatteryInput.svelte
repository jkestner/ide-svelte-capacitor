<script>
  import Literal from "@components/jorf/Literal.svelte";
  import Input from "./Input.svelte";

  export let value;

  export function summary() {
    return "battery " + value;
  }
  function sample() {
    //TODO: make clear that sampling will just get the lefthand sensor's current value. disable if it's not a dynamic value.
    value = Math.floor(Math.random() * 100) * 10;
  }
</script>

<Input {summary} {sample}>
  <Literal bind:value autocomplete />
</Input>
