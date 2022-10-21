<script>
  import Input from "./Input.svelte";
  import Literal from "@components/Literal.svelte";

  export let pin = 1;
  export let value = "high";

  export function summary() {
    return "pin " + pin;
  }
  function read() {
    console.log("reading pin ", pin);
  }
</script>

<Input {summary} {read}>
  <Literal bind:value={pin} />
</Input>
