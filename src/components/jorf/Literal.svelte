<script>
  import AutoComplete from "simple-svelte-autocomplete";
  import { nodes } from "@store/nodes";
  import { program } from "@store/program";
  import { JStateVar } from "../../IDEObjects";

  export let value;
  export let autocomplete = false;

  let items = [
    { label: "every", component: "IntervalInput" },
    { label: "time", component: "TimeInput" },
    { label: "random", component: "RandomInput" },
  ];
  let nodeItems = [];
  let createText = "Add this state variable";

  //TODO: is this reactive? needs to be
  $nodes.forEach((n) => {
    n.sensors.forEach((s) =>
      nodeItems.push({
        label: n.label + "." + s.label,
        description: s.value,
        value: s.label,
        component: s.label,
      })
    );
  });
  $: items.push(...nodeItems);
  $: items.push(...$program.state_vars);

  function addStateVar(label) {
    if (isNaN(label) && !label.startsWith("(")) {
      //TODO: going to need to reference count so we know when to delete a variable.
      let label_exists =
        label && $program.state_vars.some((v) => v.label == label);
      if (!label_exists) {
        let sv = new JStateVar(label);
        $program.state_vars.push(sv);
        $program = $program;
        items.push(sv);
      }
      return label;
    }
  }
</script>

<!-- TODO: call addStateVar on blur, passing the new item. Until then, -->
<!-- TODO: restore current value to text box on blur -->
{#if autocomplete}
  <AutoComplete
    {items}
    bind:selectedItem={value}
    labelFieldName="label"
    valueFieldName="value"
    create
    onCreate={addStateVar}
    {createText}
    hideArrow
    class="p-2 bg-slate-50  w-auto"
  >
    <div slot="item" let:item let:label>
      {@html label}
      <!-- {#if item.description}
        <span class="align-right">{item.description}</span>
      {/if} -->
    </div>
  </AutoComplete>
{:else}
  <input
    type="text"
    bind:value
    class="input outline-none outline-0 p-2 bg-slate-50 flex-auto rounded-none"
  />
{/if}
