<script>
  import { program } from "@store/program.js";
  import { Node, nodes as storeNodes } from "@store/nodes";

  import { fade } from "svelte/transition";
  import Literal from "./jorf/Literal.svelte";
  import PartPicker from "./ide/PartPicker.svelte";

  $: nodes = $storeNodes; // if you want a custom array of nodes

  // setInterval(() => {
  //   $storeNodes.forEach((node) => {
  //     node.sensors.forEach((s) => {
  //       s.value += Math.floor((Math.random() - 0.5) * 100);
  //     });
  //     node.lastUpdated = new Date();
  //     node = node;
  //   });
  //   nodes = $storeNodes;
  // }, 2000);
</script>

<ul class="mt-6 text-primary-content">
  <div class="p-2  text-left">
    <h2 class="text-base-content mb-4">
      Every <input
        type="text"
        value={10}
        class="input border-primary w-16 h-10 pt-1"
      /> minutes record:
    </h2>

    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Light</th></tr
        >
      </thead>
      <tbody>
        <tr
          ><td>3:10</td>
          <td>85</td>
          <td>33%</td>
          <td>15000</td></tr
        >
        <tr
          ><td>3:20</td>
          <td>86</td>
          <td>33%</td>
          <td>15000</td></tr
        >
        <tr
          ><td>3:30</td>
          <td>86</td>
          <td>32%</td>
          <td>14500</td></tr
        >
        <tr
          ><td>3:40</td>
          <td>87</td>
          <td>31%</td>
          <td>14400</td></tr
        >
        <tr
          ><td>3:50</td>
          <td>86</td>
          <td>31%</td>
          <td>14100</td></tr
        >
        <tr
          ><td>4:00</td>
          <td>88</td>
          <td>31%</td>
          <td>14000</td></tr
        >
        <tr
          ><td>4:00</td>
          <td>88</td>
          <td>30%</td>
          <td>13900</td></tr
        >
        <tr class="font-bold"
          ><td>4:20</td>
          <td>87</td>
          <td>30%</td>
          <td>13800</td></tr
        >
      </tbody>
    </table>

    <h2 class="text-base-content mb-4 mt-12">Save it to:</h2>

    <div class="btn-group btn-group-vertical btn-wide">
      <button class="btn btn-active bg-base-200 justify-start"
        ><img src="/cloud.svg" alt="" class="w-8 h-8 mr-2" />Pickup cloud</button
      >
      <button class="btn btn-ghost bg-base-200 justify-start"
        ><img src="/sheet.svg" alt="" class="w-8 h-8 mr-2" />Google Sheet</button
      >
      <button class="btn btn-ghost bg-base-200 justify-start"
        ><img src="/airtable.svg" alt="" class="w-8 h-8 mr-2" />Airtable</button
      >
      <button class="btn btn-ghost bg-base-200 justify-start"
        ><img src="/csv.svg" alt="" class="w-8 h-8 mr-2" />CSV file</button
      >
      <button class="btn btn-ghost bg-base-200 justify-start"
        ><img src="/endpoint.svg" alt="" class="w-8 h-8 mr-2" />HTTP endpoint</button
      >
      <button class="btn btn-ghost bg-base-200 justify-start"
        ><img src="/endpoint.svg" alt="" class="w-8 h-8 mr-2" />MQTT broker</button
      >
    </div>
  </div>
</ul>

<!-- dummy to get these dynamically assigned classes included -->
<div class="bg-primary bg-secondary bg-accent hidden" />
