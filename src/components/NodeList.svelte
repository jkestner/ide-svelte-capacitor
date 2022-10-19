<script>
  import { nodes } from "@store/nodes";

  // export let nodes;
</script>

<ul class="menu mt-6">
  {#each $nodes as node}
    <li>
      <a href="/node?id={node.id}" class="columns-3 w-auto">
        <div class="w-16 object-contain">
          <img src="wedge.svg" />
        </div>
        <h2 class="w-40 card-title">
          {node.name}
        </h2>

        <div class="stats bg-primary text-primary-content col-span-2">
          <div class="stat">
            {node.temperature / 100}ºF
          </div>
          <div class="stat">
            {node.humidity}%
          </div>
          <div class="stat">
            {node.light} lux
          </div>
        </div>
      </a>
    </li>
  {/each}
</ul>
