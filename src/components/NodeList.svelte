<script>
  export let nodes;
</script>

<ul class="menu mt-6">
  {#each nodes as node}
    <li>
      <a href="/node?id={node.id}" class="columns-2">
        <div class="w-16 object-contain">
          <img src="wedge.svg" />
        </div>

        <h2 class="w-24 card-title">
          {node.name}
        </h2>
        <div class="stats bg-primary text-primary-content">
          <div class="stat">
            {node.temperature}
          </div>
          <div class="stat">
            {node.humidity}
          </div>
          <div class="stat">
            {node.light}
          </div>
        </div>
      </a>
    </li>
  {/each}
</ul>
