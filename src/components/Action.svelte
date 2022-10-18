<script>
  import * as state from "@store/program.js";
  import Command from "./Command.svelte";
  import RemoveButton from "./RemoveButton.svelte";
  import { slide } from "svelte/transition";

  export let action;

  async function removeCommand(command) {
    //todo: make sure this is a unique item with a key
    let b = action.commands.filter((obj) => obj != command);
    action.commands = b;
    await state.update();
  }
</script>

{#if action}
  {#each action.commands as command}
    <div class="flex items-stretch group" transition:slide={{ duration: 100 }}>
      <Command {command} />
      <RemoveButton remove={() => removeCommand(command)} />
    </div>
  {/each}
{/if}
