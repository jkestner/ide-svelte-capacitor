<script>
  import * as state from "@store/program.js";
  import { nodes } from "@store/nodes";

  import OpPicker from "@components/ide/OpPicker.svelte";

  import GPInput from "./inputs/GPInput.svelte";
  import TemperatureInput from "./inputs/TemperatureInput.svelte";
  import HumidityInput from "./inputs/HumidityInput.svelte";
  import ButtonInput from "./inputs/ButtonInput.svelte";
  import LightInput from "./inputs/LightInput.svelte";
  import BatteryInput from "./inputs/BatteryInput.svelte";
  import Literal from "./Literal.svelte";
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

<div class="flex flex-auto flex-wrap p-1 mb-2 {isRoot ? '' : 'ml-3'}">
  {#if expression.left.expr}
    <svelte:self expression={expression.left.expr} /><br />
    <OpPicker bind:expression bool />
  {:else}
    <Literal
      bind:value={expression.left.value}
      autocomplete
      vocabulary={nodeInputs}
    />
    <OpPicker bind:expression />
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
      <Literal bind:value={expression.right.value} />
    {/if}
  {/if}
</div>
