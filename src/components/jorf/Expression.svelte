<script>
  import * as state from "@store/program.js";
  import { nodes } from "@store/nodes";

  import OpPicker from "@components/ide/OpPicker.svelte";
  import PartPicker from "@components/ide/PartPicker.svelte";
  import PartPalette from "@components/ide/PartPalette.svelte";

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
      inputClass: "interval",
      component: IntervalInput,
    },
    {
      label: "Time",
      inputClass: "time",
      component: TimeInput,
    },
    {
      label: "Random number",
      inputClass: "random",
      component: RandomInput,
    },
    {
      label: "Weather. temperature",
      inputClass: "temperature",
      component: TemperatureInput,
    },
    {
      label: "Weather. humidity",
      inputClass: "humidity",
      component: HumidityInput,
    },
  ];

  export let expression;
  export let isRoot = false;
  import RangeSlider from "svelte-range-slider-pips";

  // Populating autocomplete menu with, basically, JLiteral objects
  //TODO: is this reactive? needs to be
  let nodeInputs = [];
  $nodes.forEach((n) => {
    n.sensors.forEach((s) =>
      nodeInputs.push({
        label: s.label,
        description: s.label,
        inputClass: s.inputClass,
        node: n.id,
        nodeName: n.label,
        component: s.component,
      })
    );
  });

  function selectedComponent(componentName) {
    let c = inputs.find((i) => i.component == componentName);
    if (c) return c.component;
    else return null;
  }
</script>

<div class="flex flex-auto {isRoot ? '' : 'ml-3'}">
  {#if expression.left.expr}
    <svelte:self expression={expression.left.expr} /><br />
    <OpPicker bind:expression bool />
  {:else}
    <!-- <Literal
      bind:value={expression.left.value}
      autocomplete
      vocabulary={nodeInputs}
    /> -->
    <!-- <PartPicker bind:value={expression.left.value} vocabulary={nodeInputs} /> -->
    <PartPalette
      bind:value={expression.left.value}
      vocabulary={[...nodeInputs, ...inputs]}
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
      <Literal bind:value={expression.right.value} numerical />
      <!--TODO put unit here if known -->
    {/if}
  {/if}
</div>
