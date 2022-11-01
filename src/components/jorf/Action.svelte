<script>
  import RuleLine from "@components/ide/RuleLine.svelte";

  import * as state from "@store/program.js";
  import Command from "./Command.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let action;
  export let summarize;

  function handleSort(e) {
    action.commands = e.detail.items;
  }
  const flipDurationMs = 300;

  async function removeCommand(command) {
    //todo: make sure this is a unique item with a key
    let b = action.commands.filter((obj) => obj != command);
    action.commands = b;
    await state.update();
  }
</script>

<section
  use:dndzone={{ items: action.commands, flipDurationMs: 300 }}
  on:consider={handleSort}
  on:finalize={handleSort}
>
  {#each action.commands as command (command.id)}
    <div class="relative" animate:flip={{ duration: flipDurationMs }}>
      {#if command.isDndShadowItem}
        <div>{command.command}</div>
      {:else}
        <RuleLine
          item={command}
          collection={action.commands}
          remove={() => removeCommand(command)}
          {summarize}
          summary={command.command}
        >
          <Command {command} {action} />
        </RuleLine>
      {/if}
    </div>
  {/each}
</section>
