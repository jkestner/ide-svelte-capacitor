<script>
  import Input from "./Input.svelte";

  export let value = 0;

  export function summary() {
    return "time " + value;
  }
  function sample() {}
</script>

<Input {summary} {sample}>I am time</Input>
