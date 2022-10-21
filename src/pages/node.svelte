<script>
  import NodeDetail from "@components/NodeDetail.svelte";
  import { nodes } from "@store/nodes";
  import { params } from "@roxi/routify";

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

<div class="container">
  {#each $nodes as node}
    <NodeDetail {node} />
  {/each}
</div>
