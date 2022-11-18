<script>
  import Literal from "@components/jorf/Literal.svelte";
  import Input from "./Input.svelte";

  export let value;
  export let from;
  export let topic;
  export let interval;

  export function summary() {
    return "MQTT " + value + " from " + from;
  }
  function sample() {
    //TODO: make clear that sampling will just get the lefthand sensor's current value. disable if it's not a dynamic value.
    let v = Math.floor(Math.random() * 100) * 10;
    value = { value: v, label: v };
  }
</script>

<Input {sample}>
  From
  <Literal bind:from autocomplete />
  Topic
  <Literal bind:topic autocomplete />
  Value
  <Literal bind:value autocomplete />
  Check how often?
  <Literal bind:interval autocomplete />
</Input>
