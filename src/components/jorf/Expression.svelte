<script>
  import * as state from "@store/program.js";
  import { nodes } from "@store/nodes";

  import GPInput from "./inputs/GPInput.svelte";
  import TemperatureInput from "./inputs/TemperatureInput.svelte";
  import HumidityInput from "./inputs/HumidityInput.svelte";
  import ButtonInput from "./inputs/ButtonInput.svelte";
  import LightInput from "./inputs/LightInput.svelte";
  import BatteryInput from "./inputs/BatteryInput.svelte";
  import Literal from "./Literal.svelte";
  import PartPicker from "@components/ide/PartPicker.svelte";
  import IntervalInput from "./inputs/IntervalInput.svelte";
  import TimeInput from "./inputs/TimeInput.svelte";
  import RandomInput from "./inputs/RandomInput.svelte";

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
    {
      label: "Pin",
      value: "pin",
      component: GPInput,
    },
    {
      label: "Battery",
      value: "battery",
      component: BatteryInput,
    },
  ];
  // need some standardized concept/ui of how precise these are. range slider? fuzziness
  const operations = [
    { label: "equals", labelDev: "==", value: "==" },
    { label: "is greater than", labelDev: ">", value: ">" },
    { label: "is less than", labelDev: "<", value: "<" },
    { label: "doesn't equal", labelDev: "!=", value: "!=" },
    { label: "changes by", labelDev: "↕︎", value: "↕︎" },
    { label: "rises by", labelDev: "ꜛ", value: "ꜛ" },
    { label: "falls by", labelDev: "ꜜ", value: "ꜜ" },
  ];
  const bool_operations = [
    { label: "and", labelDev: "&&", value: "and" },
    { label: "or", labelDev: "||", value: "or" },
  ];
  export let expression;
  export let isRoot = false;

  // Populating autocomplete menu with, basically, JLiteral objects
  //TODO: is this reactive? needs to be
  let nodeInputs = [];
  $nodes.forEach((n) => {
    n.sensors.forEach((s) =>
      nodeInputs.push({
        label: s.label,
        description: s.value,
        value: s.label,
        component: s.label,
        node: n.id,
        nodeName: n.label,
      })
    );
  });

  function selectedComponent(componentName) {
    let c = inputs.find((i) => i.value == componentName);
    if (c) return c.component;
    else return null;
  }
</script>

<div class="flex p-1 mb-2 {isRoot ? '' : 'ml-3'}">
  {#if expression.left.expr}
    <svelte:self expression={expression.left.expr} /><br />
    <PartPicker vocabulary={bool_operations} bind:value={expression.op.op} />
  {:else}
    <Literal
      bind:value={expression.left.value}
      autocomplete
      vocabulary={nodeInputs}
    />
    <PartPicker
      vocabulary={operations}
      labelProperty="labelDev"
      bind:value={expression.op.op}
    />
    <!-- if that Literal equals a known input type, replace the rest with the input component. -->
    {#if expression.left.value && expression.left.value.component && selectedComponent(expression.left.value.component)}
      <!-- show the input component here -->
      <svelte:component
        this={selectedComponent(expression.left.value.component)}
        bind:value={expression.right.value}
      />
    {:else if expression.right.expr}
      <!-- show a generic input here -->
      (right expression)
      <!-- <svelte:self expression={expression.right.expr} /> -->
    {:else}
      <Literal bind:value={expression.right.value.value} />
    {/if}
  {/if}
</div>
