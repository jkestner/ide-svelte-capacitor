<script>
  import AutoComplete from "simple-svelte-autocomplete";
  import { nodes } from "@store/nodes";
  import { program } from "@store/program";

  export let value;

  let items = ["every", "time"];
  let nodeItems = [];

  //TODO: is this reactive? needs to be
  $nodes.forEach((n) => {
    n.sensors.forEach((s) => nodeItems.push("🛻" + n.name + "." + s.name));
  });
  items.push(...nodeItems);
  items.push(...$program.state_vars);

  function addStateVar(state_var) {
    // this check won't work when we're storing a proper object instead of just a name string
    if (!$program.state_vars.includes(state_var)) {
      $program.state_vars.push(state_var);
      $program = $program;
      items.push(state_var);
    }
    return state_var;
  }
</script>

<!-- 
<input
  type="text"
  class="input outline-none outline-0 flex-auto w-36"
  bind:value
/> -->
<!-- TODO: call addStateVar on blur, passing the new item -->
<AutoComplete
  create="true"
  {items}
  bind:selectedItem={value}
  onCreate={addStateVar}
  createText="Add this state variable"
  hideArrow
  class="bg-slate-100"
>
  <span slot="item" let:item let:label>
    {@html label}
  </span>
</AutoComplete>
