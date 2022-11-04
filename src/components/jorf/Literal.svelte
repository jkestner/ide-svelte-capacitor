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

  // Populating autocomplete menu with, basically, JLiteral objects
  //TODO: is this reactive? needs to be
  $nodes.forEach((n) => {
    n.sensors.forEach((s) =>
      nodeItems.push({
        label: n.label + "." + s.label,
        description: s.value,
        value: s.label,
        component: s.label,
        node: n.id,
        nodeName: n.label,
      })
    );
  });
  $: items.push(...nodeItems);
  $: items.push(...$program.state_vars);

  function isAddableStateVar(label) {
    return isNaN(label) && !label.startsWith("(");
  }
  function addStateVar(label) {
    //TODO: going to need to reference count so we know when to delete a variable.
    let label_exists =
      label && $program.state_vars.some((v) => v.label == label);
    if (!label_exists) {
      let sv = { label: label };

      if (isAddableStateVar(label)) {
        // add state var
        $program.state_vars.push(sv);
        $program = $program;
      } else {
        // set value to a number or mathematical expression
        sv.value = sv.label;
        value = sv;
        $program = $program;
      }
      userItems.push(sv);
      items.push(...userItems);
      items = items;
      return sv;
    }
  }
</script>

<!-- TODO: call addStateVar on blur, passing the new item. Until then, -->
<!-- TODO: restore current value to text box on blur -->
{#if autocomplete}
  <AutoComplete
    {items}
    value={() => this.selectedItem.value || this.selectedItem}
    bind:selectedItem={value}
    labelFieldName="label"
    valueFieldName="value"
    create
    onCreate={addStateVar}
    {createText}
    hideArrow
    class="p-2 bg-slate-50 w-auto"
  >
    <div slot="item" let:item let:label class="text-left">
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
