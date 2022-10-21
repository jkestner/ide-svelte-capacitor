<script>
  import RuleList from "./RuleList.svelte";
  export let node;

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

  function io() {
    return Object.entries(node).filter(
      ([key, value]) => key != "id" && key != "name"
    );
  }
</script>

<div class="card m-1">
  <h2 class="card-title">{node.name}</h2>
  <div class="card-body">
    <div class="flex bg-primary text-primary-content rounded-xl">
      {#each node.sensors as sensor}
        <div class="stat">
          <div class="stat-title">
            {sensor.name}
          </div>
          <div class="stat-value">
            {sensor.value}
          </div>
          <div class="stat-desc" />
        </div>
      {/each}
    </div>

    <h3 class="text-2xl mt-4">Part of rules</h3>
    <RuleList {rules} />
  </div>

  <div class="card-actions" />
</div>
