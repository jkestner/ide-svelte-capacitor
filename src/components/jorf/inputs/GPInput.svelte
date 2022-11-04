<script>
  import Input from "./Input.svelte";
  import Literal from "@components/jorf/Literal.svelte";

  export let pin = 1;
  export let value;

  export function summary() {
    return "pin " + pin;
  }
  function sample() {
    //TODO: make clear that sampling will just get the lefthand sensor's current value. disable if it's not a dynamic value.
    let v = Math.floor(Math.random() * 100) * 10;
    value = { value: v, label: v };
  }
</script>

<Input {sample}>
  <Literal bind:value={pin} autocomplete />
</Input>
