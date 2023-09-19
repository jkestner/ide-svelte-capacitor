<script>
  import { program } from "@store/program.js";
  import { Node, nodes as storeNodes } from "@store/nodes";
  import { Line } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  import { fade } from "svelte/transition";

  $: node = $storeNodes[0]; // if you want a custom array of nodes

  const data = {
    labels: [
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "1:00",
      "2:00",
      "3.00",
      "4.00",
      "5.00",
    ],
    datasets: [
      {
        label: "Garden SW",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "black",
        borderColor: "black",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "black",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "black",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 42, 44, 47],
      },
      {
        label: "Garden NW",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "white",
        borderColor: "white",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "white",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "black",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [28, 48, 40, 19, 86, 87, 90, 92, 94, 91],
      },
    ],
  };

  import daisyuiColors from "daisyui/src/colors/themes";
  console.log(daisyuiColors["[data-theme=light]"].primary);
</script>

<ul class="mt-0 text-primary-content">
  <!-- <a href="/node?id={node.id}">{node.label}</a> -->
  <li class="p-2 gap-2">
    {#if node.sensors[0]}
      <div
        transition:fade
        class="stat relative bg-{node.color} bg-contain bg-center bg-no-repeat rounded-xl col-span-2 h-96 p-4 "
      >
        <Line {data} options={{ responsive: true }} class="mt-3" />

        <div class="absolute left-2 top-2 text-lg">
          {node.sensors[0].label}
        </div>
        <div class="stat-value absolute right-2 top-2">
          {Math.floor(node.sensors[0].value / 100)}<span class="text-lg"
            >{node.sensors[0].unit}</span
          >
        </div>
      </div>
    {/if}
  </li>
</ul>
<!-- dummy to get these dynamically assigned classes included -->
<div class="bg-primary bg-secondary bg-accent hidden" />
