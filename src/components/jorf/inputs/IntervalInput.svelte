<script>
  import Input from "./Input.svelte";

  export let value = 0;

  export function summary() {
    return "interval " + value;
  }
  function sample() {}
</script>

<Input {sample}>I am interval</Input>
