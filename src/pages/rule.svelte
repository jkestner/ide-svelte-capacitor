<script>
  import { onMount } from "svelte";
  // import Time from "svelte-time";

  // import * as state from "@utils/state.js";
  import * as state from "@store/program.js";
  import { program, undoable, redoable } from "@store/program.js";

  import Condition from "@components/Condition.svelte";
  import NodeList from "@components/NodeList.svelte";
  import RemoveButton from "@components/RemoveButton.svelte";
  import { params } from "@roxi/routify";
  import Popdown from "@components/transitions/Popdown.svelte";

  import FaUndoAlt from "svelte-icons/fa/FaUndoAlt.svelte";
  import FaRedoAlt from "svelte-icons/fa/FaRedoAlt.svelte";

  import Action from "@components/Action.svelte";

  let localProgram;

  state.program.subscribe((p) => {
    console.log("subscribed: ", p);
    localProgram = p;
  });

  //todo: these are dummies. replace nodes with simulated nodes and a store. load rules from db.
  let nodes = [
    { id: "1", name: "Garden", temperature: 72, humidity: 40, light: 4000 },
    { id: "2", name: "NW", temperature: 78, humidity: 41, light: 3800 },
    { id: "3", name: "Coop", temperature: 83, humidity: 55, light: 500 },
  ];
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
    program.set(localProgram);
    state.update();
  }

  async function removeRule(rule) {
    localProgram.rules.splice(localProgram.rules.indexOf(rule), 1);
    program.set(localProgram);
    state.update();
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
    await program.set(localProgram);
    state.update();
  }

  async function addCommand(action) {
    action.commands.push({
      command: "led",
      params: [],
    });
    program.set(localProgram);
    state.update();
  }

  async function saveProgram() {
    // jorf = jorf;
    await state.update();
  }
</script>

<div class="card card-bordered p-2 shadow-inner">
  <div class="flex flex-row justify-between items-center">
    <input
      class="input text-3xl font-bold m-1"
      bind:value={$program.name}
      placeholder="program"
      on:blur={saveProgram}
    />
    <div class="flex items-center gap-2">
      <button
        class="btn btn-sm btn-circle p-1"
        disabled={!$undoable}
        on:click={state.undo}
      >
        <FaUndoAlt />
      </button>
      <!-- <Time relative timestamp={program.updated} /> -->
      <em class="text-sm">{$program.updated}</em>
      <button
        class="btn btn-sm btn-circle p-1"
        disabled={!$redoable}
        on:click={state.redo}><FaRedoAlt /></button
      >
    </div>
  </div>
  <div class="card card-bordered p-2 mb-8">
    <div class="card-title">State</div>
    <ul class="card-body">
      {#if $program.state_vars}
        {#each $program.state_vars as v}
          <li>{v.var_name}</li>
        {/each}
      {/if}
    </ul>
  </div>

  {#if $program.rules.length}
    {#each $program.rules as rule}
      <div class="mb-8 grid">
        <div class="flex flex-row w-full group">
          <input
            class="input text-2xl bg-primary placeholder-primary-100-content text-primary-content rounded-b-none"
            bind:value={rule.name}
            placeholder="rule"
            on:blur={saveProgram}
          />

          <input
            class="input hover:input-bordered w-full"
            bind:value={rule.description}
            placeholder="description"
            on:blur={saveProgram}
          />
          <RemoveButton remove={() => removeRule(rule)} />
        </div>
        <div
          class="sm:columns-2 p-2 border-primary border-2 rounded-3xl rounded-tl-none rounded"
        >
          <h3 class="text-xl btn btn-accent no-animation w-24 rounded-b-none">
            when
          </h3>
          <div
            class="grid break-after-column card card-bordered border-2 rounded-tl-none border-accent p-2"
          >
            <Condition condition={rule.condition} />
            <button
              class="btn"
              on:click={(event) => addCondition(rule.condition)}>+</button
            >
          </div>

          <h3 class="text-xl btn btn-accent no-animation w-24 rounded-b-none">
            do
          </h3>
          <div
            class="grid card card-bordered border-2 rounded-tl-none border-accent p-2"
          >
            <Action action={rule.action} />
            <button class="btn" on:click={(event) => addCommand(rule.action)}
              >+</button
            >
          </div>
        </div>
      </div>
    {/each}
  {:else}
    No rules
  {/if}
  <button class="btn" on:click={(event) => addRule()}>+ rule</button>

  <h3 class="text-xl mt-10">Uses nodes</h3>
  <NodeList {nodes} />
</div>

<style>
</style>
