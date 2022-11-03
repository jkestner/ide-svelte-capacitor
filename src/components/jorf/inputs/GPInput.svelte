<script>
  import Input from "./Input.svelte";
  import Literal from "@components/jorf/Literal.svelte";

  export let pin = 1;
  export let value = "high";

  export function summary() {
    return "pin " + pin;
  }
  function sample() {
    console.log("sampling pin ", pin);
  }
</script>

<Input {summary} {sample}>
  <Literal bind:value={pin} autocomplete />
</Input>
