<script>
  import { onMount } from "svelte";
  import AutoComplete from "simple-svelte-autocomplete";
  import { nodes } from "@store/nodes";
  import { program } from "@store/program";
  import { JStateVar } from "../../IDEObjects";

  export let value;
  export let autocomplete = false;
  export let vocabulary = [];

  $: items = [
    { label: "every", component: "IntervalInput" },
    { label: "time", component: "TimeInput" },
    { label: "random", component: "RandomInput" },
  ];
  let createText = "Add this state variable";
  let userItems = [];

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

  onMount(async () => {
    myInput = document.getElementById(myId);
    myInput.autocomplete = "off";

    if (autocomplete) {
      items.push(...vocabulary);
    }
    items.push(...$program.state_vars);
    items.push(...userItems);
    items = items;
  });
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
    class="p-2 bg-slate-50 w-32"
  >
    <div slot="item" let:item let:label class="text-left">
      {#if item.nodeName}<span style="font-weight:300">{item.nodeName}.</span
        >{/if}{label}
      <!-- {#if item.description}
        <span class="align-right">{item.description}</span>
      {/if} -->
    </div>
  </AutoComplete>
{:else}
  <input
    type="text"
    bind:value
    class="input outline-none outline-0 p-2 bg-slate-50 w-32 rounded-none"
  />
  <span class="autocomplete-list" />
{/if}

<style>
  .autocomplete-list.hidden {
    width: 100px;
  }
</style>
