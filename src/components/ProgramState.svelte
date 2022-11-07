<script>
  import { program } from "@store/program.js";
  import { JStateVar } from "../IDEObjects";

  import RuleLine from "@components/ide/RuleLine.svelte";

  let collapsed = false;
  let newStateVarLabel = "";
  $: isDisabled =
    newStateVarLabel.length == 0 ||
    !isNaN(newStateVarLabel) ||
    newStateVarLabel.startsWith("(");

  function addStateVar(label) {
    if (isNaN(label) && !label.startsWith("(")) {
      //TODO: going to need to reference count so we know when to delete a variable.
      let label_exists =
        label && $program.state_vars.some((v) => v.label == label);
      if (!label_exists) {
        let sv = new JStateVar(label);
        $program.state_vars.push(sv);
        $program = $program;
      }
      newStateVarLabel = "";
      return label;
    }
  }

  function removeState(state) {
    $program.state_vars.splice($program.state_vars.indexOf(state), 1);
    $program = $program;
  }
</script>

<section class="sectionrelative">
  <div class="heading">
    <h3 class="inline-block">State</h3>
    {#if collapsed}
      <em class="ml-4"
        >{$program.state_vars.length} variable{#if $program.state_vars.length !== 1}s{/if}</em
      >{/if}
    <!-- <button
      class="btn btn-ghost no-animation opacity-50 group-hover:opacity-100 btn-xs col-span-1 z-20 -ml-6 mt-0 absolute right-1"
      on:click={() => (collapsed = !collapsed)}>–</button
    > -->
  </div>

  {#if !collapsed}
    {#each $program.state_vars as v}
      <RuleLine
        item={v}
        collection={$program.state_vars}
        remove={() => removeState(v)}
      >
        <input
          value={v.label}
          on:change={(me) => {
            v.label = me.target.value;
            $program = $program;
          }}
          class="input input-sm input-ghost placeholder-slate-50 placeholder-opacity-0 hover:placeholder-opacity-50"
        />: {@html v.value || "<em>no value</em>"}
      </RuleLine>
    {/each}
    <div class="input-group">
      <input
        bind:value={newStateVarLabel}
        on:keyup={(e) => e.key === "Enter" && addStateVar(newStateVarLabel)}
        placeholder="Add a variable"
        class="input input-sm bg-slate-50 border-0 placeholder-slate-500 placeholder-opacity-50 hover:placeholder-opacity-50"
      />
      <button
        class="btn btn-sm"
        on:click={(event) => addStateVar(newStateVarLabel)}
        disabled={isDisabled}>+</button
      >
    </div>
  {/if}
</section>
