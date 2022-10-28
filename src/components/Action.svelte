<script>
  import * as state from "@store/program.js";
  import Command from "./Command.svelte";
  import RemoveButton from "./RemoveButton.svelte";
  import { slide } from "svelte/transition";

  export let action;
  export let summarize;

  async function removeCommand(command) {
    //todo: make sure this is a unique item with a key
    let b = action.commands.filter((obj) => obj != command);
    action.commands = b;
    await state.update();
  }
</script>

{#if action}
  {#each action.commands as command}
    {#if summarize}
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
      </div>
    {/if}
  {/each}
{/if}
