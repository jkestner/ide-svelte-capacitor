<script>
  import { program } from "@store/program.js";
  import { nodes as storeNodes } from "@store/nodes";

  import HumidityInput from "./jorf/inputs/HumidityInput.svelte";

  export let nodes = $storeNodes; // if you want a custom array of nodes
</script>

<ul class="mt-6 text-primary-content">
  {#each nodes as node}
    <h2 class="text-base-content">
      <!-- <a href="/node?id={node.id}">{node.label}</a> -->
      <a
        href=""
        on:click={() => {
          node.addSensor("Humdity", "humidity", HumidityInput);
          node.simulate();
        }}>{node.label}</a
      >
    </h2>
    <li class="grid grid-cols-3 p-2 gap-2">
      {#if node.sensors[0]}
        <div class="stat bg-{node.color} rounded-xl h-32 p-4 ">
          <div class="stat-title left-0 -mt-2 text-lg">
            {node.sensors[0].label}
          </div>
          <div class="stat-value">
            {Math.round(node.sensors[0].value / 100).toFixed(1)}<span
              class="stat-desc text-lg">ºF</span
            >
          </div>
        </div>
      {/if}
      {#if node.sensors[2]}
        <div
          class="stat relative bg-{node.color} bg-contain bg-center bg-no-repeat rounded-xl col-span-2 h-32 p-4 "
          style="background-image: url(/line_graph.svg)"
        >
          <div class="stat-title absolute left-0 top-2 text-lg">
            {node.sensors[2].label}
          </div>
          <div class="stat-value absolute right-2 top-2">
            {Math.floor(node.sensors[2].value / 100)}<span
              class="stat-desc text-lg">dB</span
            >
          </div>
        </div>
      {/if}
      {#if node.sensors[1]}
        <div
          class="stat relative bg-{node.color}  bg-contain bg-bottom bg-no-repeat rounded-xl col-span-3 h-32 p-4 "
          style="background-image: url(/bar_graph.svg)"
        >
          <div class="stat-title absolute left-0 top-2 text-lg">
            {node.sensors[1].label}
          </div>
          <div class="stat-value absolute right-2 top-2">
            {node.sensors[1].value}<span class="stat-desc text-lg">lux</span>
          </div>
        </div>
      {/if}
      {#if node.sensors[5]}
        <div class="stat bg-{node.color} rounded-xl h-32 p-4">
          <div class="stat-title left-0 -mt-2 text-lg">
            {node.sensors[5].label}
          </div>
          <div class="stat-value">
            {Math.round(node.sensors[5].value / 100).toFixed(1)}<span
              class="stat-desc text-lg">ºF</span
            >
          </div>
        </div>
      {/if}
    </li>
  {/each}
</ul>
<!-- dummy to get these dynamically assigned classes included -->
<div class="bg-primary bg-secondary bg-accent hidden" />
