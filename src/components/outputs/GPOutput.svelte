<script>
  import Output from "./Output.svelte";
  import Literal from "@components/Literal.svelte";

  export let pin = 1;
  export let value = "high";
  export function summary() {
    return "pin " + pin + " is " + value;
  }
</script>

<Output>
  Address
  <Literal bind:value={pin} />
  to
  <Literal bind:value />
</Output>
