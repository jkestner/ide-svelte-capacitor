<script>
  import Literal from "@components/jorf/Literal.svelte";
  import Input from "./Input.svelte";
  import RangeSlider from "svelte-range-slider-pips";

  export let value = 1000;

  $: values = [value];
  let range = [0, 4000];

  export function summary() {
    return "light " + value;
  }
  function sample() {
    //TODO: make clear that sampling will just get the lefthand sensor's current value. disable if it's not a dynamic value.
    let v = Math.floor(Math.random() * 100) * 10;
    // value = { value: v, label: v };
  }
</script>

<Input {sample}>
  <div style="width:250px; height: 50px;">
    <!-- <Literal bind:value autocomplete /> -->
    <RangeSlider
      bind:values
      style="width:200px; height: 50px;"
      min={range[0]}
      max={range[1]}
      all="label"
    />
    {console.log(values, value)}
  </div>
</Input>
