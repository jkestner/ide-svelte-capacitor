<script>
  import { program } from "@store/program.js";
  import { Node, nodes as storeNodes } from "@store/nodes";

  import Co2Input from "./jorf/inputs/Co2Input.svelte";
  import { fade } from "svelte/transition";

  $: nodes = $storeNodes; // if you want a custom array of nodes

  //     });
  //   });
</script>

<ul class="mt-6 text-primary-content">
  {#each nodes as node}
    <h2 class="text-base-content">
      <a
        href=""
        on:click={() => {
          $storeNodes.push(new Node("test", "secondary"));
        }}>add</a
      >
      <!-- <a href="/node?id={node.id}">{node.label}</a> -->
      <a
        href=""
        on:click={() => {
          node.addSensor("CO2", "ppm", "co2", Co2Input);
        }}>{node.label}</a
      >
    </h2>
    <li class="grid grid-cols-3 p-2 gap-2">
      {#if node.sensors[0]}
        <div
          transition:fade
          class="stat relative bg-{node.color} bg-contain bg-center bg-no-repeat rounded-xl col-span-2 h-32 p-4 "
          style="background-image: url(/line_graph.svg)"
        >
          <div class="stat-title absolute left-0 top-2 text-lg">
            {node.sensors[0].label}
          </div>
          <div class="stat-value absolute right-2 top-2">
            {Math.floor(node.sensors[0].value / 100)}<span
              class="stat-desc text-lg">{node.sensors[0].unit}</span
            >
          </div>
        </div>
      {/if}
      {#if node.sensors[2]}
        <div transition:fade class="stat bg-{node.color} rounded-xl h-32 p-4 ">
          <div class="stat-title left-0 -mt-2 text-lg">
            {node.sensors[2].label}
          </div>
          <div class="stat-value">
            {Math.round(node.sensors[2].value / 100).toFixed(1)}<span
              class="stat-desc text-lg">{node.sensors[2].unit}</span
            >
          </div>
        </div>
      {/if}
      {#if node.sensors[1]}
        <div
          transition:fade
          class="stat relative bg-{node.color} bg-contain bg-bottom bg-no-repeat rounded-xl col-span-3 h-32 p-4 "
          style="background-image: url(/bar_graph.svg)"
        >
          <div class="stat-title absolute left-0 top-2 text-lg">
            {node.sensors[1].label}
          </div>
          <div class="stat-value absolute right-2 top-2">
            {node.sensors[1].value}<span class="stat-desc text-lg"
              >{node.sensors[1].unit}</span
            >
          </div>
        </div>
      {/if}
      {#if node.sensors[5]}
        <div transition:fade class="stat bg-{node.color} rounded-xl h-32 p-4">
          <div class="stat-title left-0 -mt-2 text-lg">
            {node.sensors[5].label}
          </div>
          <div class="stat-value">
            {Math.round(node.sensors[5].value / 100).toFixed(0)}<span
              class="stat-desc text-lg">{node.sensors[5].unit}</span
            >
          </div>
        </div>
      {/if}
    </li>
  {/each}
</ul>
<!-- dummy to get these dynamically assigned classes included -->
<div class="bg-primary bg-secondary bg-accent hidden" />
