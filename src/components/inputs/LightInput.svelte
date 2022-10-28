<script>
  import Input from "./Input.svelte";

  export let value = 0;

  export function summary() {
    return "light " + value;
  }
  function sample() {
    console.log("sampling light level");
  }
</script>

<Input {summary} {sample}>I am light level</Input>
