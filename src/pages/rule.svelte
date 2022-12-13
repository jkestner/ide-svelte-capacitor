<script>
  import { onMount } from "svelte";
  import Time from "svelte-time";

  import * as state from "@store/program.js";
  import { program, undoable, redoable } from "@store/program.js";
  import { nodes } from "@store/nodes";

  import Condition from "@components/jorf/Condition.svelte";
  import NodeList from "@components/NodeList.svelte";
  import RemoveButton from "@components/ide/RemoveButton.svelte";
  import { params } from "@roxi/routify";

  import FaUndoAlt from "svelte-icons/fa/FaUndoAlt.svelte";
  import FaRedoAlt from "svelte-icons/fa/FaRedoAlt.svelte";

  import Action from "@components/jorf/Action.svelte";
  import ProgramState from "@components/ProgramState.svelte";

  let localProgram;

  // this feels unnecessary when we have the $ syntax.
  state.program.subscribe((p) => {
    localProgram = p;
  });

  //todo: these are dummies. load rules from db.
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

  let summarize = false;

  onMount(async () => {
    console.log($program);
  });

  async function addRule() {
    localProgram.rules.push({
      id: Math.floor(Math.random() * 999),
      action: {
        commands: [],
      },
      condition: {
        expressions: [],
      },
    });
    $program = localProgram;
  }

  async function removeRule(rule) {
    localProgram.rules.splice(localProgram.rules.indexOf(rule), 1);
    $program = localProgram;
  }

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
      if (key === name) {
        allNamedKids.push(object[key]);
      } else if (typeof object[key] === "object") {
        allNamedKids.push(...allChildrenNamed(name, object[key]));
      }
    }
    return allNamedKids;
  }
</script>

<div class="flex justify-between">
  <div class="flex-initial">
    <input
      class="input text-3xl font-bold w-full m-1"
      value={$program.name}
      placeholder="program"
      on:change={(me) => {
        $program.name = me.target.value;
        $program = $program;
      }}
    />
  </div>
  <div class="flex-none items-center gap-2">
    <button
      class="btn btn-sm btn-circle p-1"
      disabled={!$undoable}
      on:click={state.undo}
    >
      <FaUndoAlt />
    </button>
    <Time relative timestamp={program.updated} />
    <!-- TODO: show actual time on hover-->
    <!-- <em class="text-sm">{$program.updated}</em> -->
    <button
      class="btn btn-sm btn-circle p-1"
      disabled={!$redoable}
      on:click={state.redo}><FaRedoAlt /></button
    >
  </div>
</div>

{#if $program.rules.length}
  {#each $program.rules as rule}
    <div class="card mb-8 grid">
      <div
        class="flex w-full peer group hover:bg-primary hover:bg-opacity-20 border-b-2"
      >
        <input
          class="input input-ghost w-full text-xl placeholder-slate-500 placeholder-opacity-50 hover:placeholder-opacity-50"
          placeholder="rule"
          value={rule.name || ""}
          on:change={(me) => {
            rule.name = me.target.value;
            $program = $program;
          }}
        />
        <div class="widgets flex-none w-7">
          <button
            class="btn btn-ghost opacity-50 group-hover:opacity-100 btn-xs col-span-1"
            class:btn-ghost={!summarize}
            on:click={() => (summarize = !summarize)}>–</button
          >
          <RemoveButton remove={() => removeRule(rule)} />
        </div>
      </div>

      <div
        class="p-2 overflow-visible peer-hover:bg-primary peer-hover:bg-opacity-20"
      >
        <h3 class="heading">when</h3>
        <div class="grid break-after-column">
          <Condition condition={rule.condition} {summarize} />
        </div>
        <h3 class="heading">do</h3>
        <div class="grid">
          <Action action={rule.action} {summarize} />
        </div>
      </div>
    </div>
  {/each}
{:else}
  No rules
{/if}
<button class="btn" on:click={(event) => addRule()}>+ rule</button>

<div class="divider" />

<div class="flex flex-auto flex-wrap">
  <ProgramState />
  <div>
    <h3 class="heading">Uses nodes</h3>
    <NodeList nodes={localnodes()} />
  </div>
</div>

<style>
</style>
