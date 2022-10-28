<script>
  import Input from "./Input.svelte";

  export let value = 0;

  export function summary() {
    return "humidity " + value;
  }
  function sample() {
    console.log("sampling humdity");
  }
</script>

<Input {summary} {sample}>I am rH</Input>
