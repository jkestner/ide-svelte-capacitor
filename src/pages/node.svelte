<script>
  import NodeDetail from "@components/NodeDetail.svelte";
  import { params } from "@roxi/routify";

  let nodes = [
    { id: "1", name: "Garden", temperature: 72, humidity: 40, light: 4000 },
    { id: "2", name: "NW", temperature: 78, humidity: 41, light: 3800 },
    { id: "3", name: "Coop", temperature: 83, humidity: 55, light: 500 },
  ];
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

  function nodes_filtered() {
    if ($params.id) {
      let b = nodes.find((n) => {
        return n.id === $params.id;
      });
      console.log(b);
      return [b];
    } else return nodes;
  }
</script>

<div class="container">
  {#each nodes_filtered() as node}
    <NodeDetail {node} />
  {/each}
</div>
