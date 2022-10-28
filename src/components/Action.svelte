<script>
  import * as state from "@store/program.js";
  import Command from "./Command.svelte";
  import RemoveButton from "./ide/RemoveButton.svelte";
  import { slide } from "svelte/transition";
  import NotesTextarea from "./ide/NotesTextarea.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let action;
  export let summarize;

  function handleSort(e) {
    action.commands = e.detail.items;
  }

  async function removeCommand(command) {
    //todo: make sure this is a unique item with a key
    let b = action.commands.filter((obj) => obj != command);
    action.commands = b;
    await state.update();
  }
  const flipDurationMs = 300;
</script>

<section
  use:dndzone={{ items: action.commands, flipDurationMs: 300 }}
  on:consider={handleSort}
  on:finalize={handleSort}
>
  {#if action}
    {#each action.commands as command (command.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        {#if command.isDndShadowItem}
          <div>{command.command}</div>
        {:else if summarize}
          <div>{command.command}</div>
        {:else}
          <div
            class="flex items-stretch group columns-2  hover:bg-slate-100"
            transition:slide={{ duration: 100 }}
          >
            <div class="w-1/2 relative">
              <Command {command} {summarize} />
              <RemoveButton remove={() => removeCommand(command)} />
            </div>
            <NotesTextarea bind:notes={command.notes} />
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</section>
