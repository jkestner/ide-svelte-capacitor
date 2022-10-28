<script>
  import { onMount } from "svelte";
  import Time from "svelte-time";

  import * as state from "@store/program.js";
  import { program, undoable, redoable } from "@store/program.js";
  // import { nodes } from "@store/nodes";

  import Condition from "@components/Condition.svelte";
  import NodeList from "@components/NodeList.svelte";
  import RemoveButton from "@components/ide/RemoveButton.svelte";
  import { params } from "@roxi/routify";
  import Popdown from "@components/transitions/Popdown.svelte";

  import FaUndoAlt from "svelte-icons/fa/FaUndoAlt.svelte";
  import FaRedoAlt from "svelte-icons/fa/FaRedoAlt.svelte";

  import Action from "@components/Action.svelte";
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

  async function addCondition(condition) {
    condition.expressions.push({
      left: {
        value: "temp",
      },
      op: {
        op: ">",
      },
      right: {
        value: "72",
      },
    });
    $program = localProgram;
  }

  async function addCommand(action) {
    action.commands.push({
      command: "sms",
      params: { to: "602", content: "texto" },
    });
    $program = localProgram;
  }
</script>

<div class="card card-bordered p-2 shadow-inner">
  <div class="flex flex-row justify-between items-center">
    <input
      class="input text-3xl font-bold m-1"
      value={$program.name}
      placeholder="program"
      on:change={(me) => {
        $program.name = me.target.value;
        $program = $program;
      }}
    />
    <div class="flex items-center gap-2">
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
  <ProgramState />
  <button
    class="btn btn-xs w-24"
    class:btn-outline={summarize}
    on:click={() => (summarize = !summarize)}>summarize</button
  >

  {#if $program.rules.length}
    {#each $program.rules as rule}
      <div class="mb-8 grid">
        <div class="flex flex-row group">
          <input
            class="input text-lg placeholder-gray-100 placeholder-opacity-0 hover:placeholder-opacity-50"
            placeholder="rule"
            value={rule.name || ""}
            on:change={(me) => {
              rule.name = me.target.value;
              $program = $program;
            }}
          />
          <RemoveButton remove={() => removeRule(rule)} />
        </div>
        <div class="sm:columns-2 card card-bordered border-2 border-accent p-2">
          <h3 class="text-xl no-animation">when</h3>
          <div class="grid break-after-column">
            <Condition condition={rule.condition} {summarize} />
            {#if !summarize}
              <button
                class="btn w-24"
                on:click={(event) => addCondition(rule.condition)}>+</button
              >
            {/if}
          </div>

          <h3 class="text-xl no-animation">do</h3>
          <div class="grid">
            <Action action={rule.action} {summarize} />
            {#if !summarize}
              <button
                class="btn w-24"
                on:click={(event) => addCommand(rule.action)}>+</button
              >
            {/if}
          </div>
        </div>
      </div>
    {/each}
  {:else}
    No rules
  {/if}
  <button class="btn" on:click={(event) => addRule()}>+ rule</button>

  <h3 class="text-xl mt-10">Uses nodes</h3>
  <NodeList />
</div>

<style>
</style>
