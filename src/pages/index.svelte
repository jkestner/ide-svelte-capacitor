<script>
  import NodeList from "@components/NodeList.svelte";
  import RuleList from "@components/RuleList.svelte";
  //   import App from "src/App.svelte";
  import Index from "./index.svelte";

  let rules = [
    {
      id: "1",
      name: "watering",
      lastUpdated: "4 minutes ago",
      lastOutput: "turned on port 1",
    },
    {
      id: "2",
      name: "sun log",
      lastUpdated: "17 minutes ago",
      lastOutput: "lux: 5000, 5200, 2500, 2000",
    },
    {
      id: "3",
      name: "watering",
      lastUpdated: "4 minutes ago",
      lastOutput: "turned on port 1",
    },
  ];
</script>

<div class="main">
  <h2 class="text-2xl font-bold m-1">Everything</h2>

  <div class="tabs tabs-boxed">
    <a class="tab tab-active" href="node">Nodes</a>
    <a class="tab" href="rule">Rules</a>
    <a class="tab">Map</a>
  </div>

  <h3 class="text-xl">Nodes</h3>
  <NodeList />

  <h3 class="text-xl">Rules</h3>
  <RuleList {rules} />
</div>

<style>
  .main {
    text-align: center;
    margin: 50px auto;
  }
</style>
