<script>
  import GPInput from "./inputs/GPInput.svelte";
  import TemperatureInput from "./inputs/TemperatureInput.svelte";
  import HumidityInput from "./inputs/HumidityInput.svelte";
  import ButtonInput from "./inputs/ButtonInput.svelte";
  import LightInput from "./inputs/LightInput.svelte";
  import Literal from "./Literal.svelte";
  import PartPicker from "./PartPicker.svelte";
  import IntervalInput from "./inputs/IntervalInput.svelte";
  import TimeInput from "./inputs/TimeInput.svelte";
  import RandomInput from "./inputs/RandomInput.svelte";
  import RuleLine from "./ide/RuleLine.svelte";

  const inputs = [
    {
      label: "Interval",
      value: "interval",
      component: IntervalInput,
    },
    {
      label: "Time",
      value: "time",
      component: TimeInput,
    },
    {
      label: "Random number",
      value: "random",
      component: RandomInput,
    },
    {
      label: "Temperature",
      value: "temperature",
      component: TemperatureInput,
    },
    {
      label: "Humidity",
      value: "humidity",
      component: HumidityInput,
    },
    {
      label: "Light",
      value: "light",
      component: LightInput,
    },
    {
      label: "Button",
      value: "button",
      component: ButtonInput,
    },
  ];
  // need some standardized concept/ui of how precise these are. range slider? fuzziness
  const operations = [
    { label: "equals", value: "==" },
    { label: "is greater than", value: ">" },
    { label: "is less than", value: "<" },
    { label: "doesn't equal", value: "!=" },
    { label: "changes by", value: "↕︎" },
    { label: "rises by", value: "ꜛ" },
    { label: "falls by", value: "ꜜ" },
  ];
  const bool_operations = [
    { label: "and", value: "and" },
    { label: "or", value: "or" },
  ];
  export let expression;
  export let condition;
  export let isRoot = false;

  function selectedComponent(componentName) {
    let c = inputs.find((i) => i.value == componentName);
    if (c) return c.component;
    else return null;
  }
</script>

<div class="flex p-1 mb-2 {isRoot ? '' : 'ml-3'}">
  {#if expression.left.expr}
    <svelte:self expression={expression.left.expr} /><br />
    <PartPicker
      class="h-10"
      vocabulary={bool_operations}
      bind:value={expression.op.op}
    />
  {:else}
    <Literal bind:value={expression.left.value} />
    <!--
TODO: if this Literal equals a known input type, replace the rest with the input component.
-->
    {#if expression.left.value && expression.left.value.component && selectedComponent(expression.left.value.component)}
      <!-- show the input component here -->
      <svelte:component
        this={selectedComponent(expression.left.value.component)}
      />
    {:else}
      <!-- show a generic input here -->
      <PartPicker
        class="h-10"
        vocabulary={operations}
        bind:value={expression.op.op}
      />

      {#if expression.right.expr}
        a
        <!-- <svelte:self expression={expression.right.expr} /> -->
      {:else}
        <Literal bind:value={expression.right.value} />
      {/if}
    {/if}
  {/if}
</div>
