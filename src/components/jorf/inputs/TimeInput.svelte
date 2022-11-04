<script>
  import Input from "./Input.svelte";

  export let value = 0;

  export function summary() {
    return "time " + value;
  }
  function sample() {}
</script>

<Input {sample}>I am time</Input>
