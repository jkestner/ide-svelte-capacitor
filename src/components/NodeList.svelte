<script>
  import { program } from "@store/program.js";
  import { nodes } from "@store/nodes";

  // TODO: This is running constantly because the node sensor values are changing. should only change when the rules change.
  $: localnodes = () => {
    let localNodeIds = allChildrenNamed("nodeName", $program); //once we have stable ids, use "node"

    return $nodes.filter((n) => {
      if (localNodeIds.indexOf(n.label) > -1) return n; //once we have stable ids, use n.id
    });
  };

  function allChildrenNamed(name, object) {
    let allNamedKids = [];

    for (var key in object) {
      // console.log("------");
      // console.log(key, object[key], typeof object[key]);
      if (key === name) {
        allNamedKids.push(object[key]);
        // console.log(object[key], " added");
      } else if (typeof object[key] === "object") {
        allNamedKids.push(...allChildrenNamed(name, object[key]));
      }
    }
    return allNamedKids;
  }
</script>

<ul class="menu mt-6 ">
  {#each localnodes() as node}
    <li>
      <a href="/node?id={node.id}" class="columns-3 w-auto">
        <div class="w-16 object-contain">
          <img src="wedge.svg" />
        </div>
        <h2 class="w-40 card-title">
          {node.label}
        </h2>
        <div
          class="stats stats-horizontal w-full bg-primary text-primary-content rounded-xl"
        >
          <div class="stat">
            <div class="stat-value text-base">
              {node.sensors[0].value / 100}ºF
            </div>
          </div>

          <div class="stat">
            <div class="stat-value text-base">
              {Math.floor(node.sensors[2].value / 100)}%
            </div>
          </div>
          <div class="stat">
            <div class="stat-value text-base">
              {node.sensors[1].value} lux
            </div>
          </div>
        </div>
      </a>
    </li>
  {/each}
</ul>
