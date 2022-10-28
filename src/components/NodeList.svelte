<script>
  import { nodes } from "@store/nodes";
</script>

<ul class="menu mt-6">
  {#each $nodes as node}
    <li>
      <a href="/node?id={node.id}" class="columns-3 w-auto">
        <div class="w-16 object-contain">
          <img src="wedge.svg" />
        </div>
        <h2 class="w-40 card-title">
          {node.label}
        </h2>
        <div class="flex w-1/3 bg-primary text-primary-content rounded-xl">
          <div class="stat stat-value text-base">
            {node.sensors[0].value / 100}ºF
          </div>
          <div class="stat stat-value text-base">
            {Math.floor(node.sensors[2].value / 100)}%
          </div>
          <div class="stat stat-value text-base">
            {node.sensors[1].value} lux
          </div>
        </div>
      </a>
    </li>
  {/each}
</ul>
