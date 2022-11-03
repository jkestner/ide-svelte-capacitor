<script>
  import RuleLine from "@components/ide/RuleLine.svelte";

  import * as state from "@store/program.js";
  import { program } from "@store/program.js";
  import Command from "./Command.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let action;
  export let summarize;

  const flipDurationMs = 300;
  let dragDisabled = false;
  function handleSort(e) {
    action.commands = e.detail.items;
  }

  async function addCommand(action) {
    action.commands.push({
      id: Math.floor(Math.random() * 999),
      command: "sms",
      params: { to: "602", content: "texto" },
    });
    $program = $program;
  }

  async function removeCommand(command) {
    //todo: make sure this is a unique item with a key
    let b = action.commands.filter((obj) => obj != command);
    action.commands = b;
    await state.update();
  }
</script>

<section
  use:dndzone={{ items: action.commands, flipDurationMs, dragDisabled }}
  on:consider={handleSort}
  on:finalize={handleSort}
  class="steps steps-vertical"
>
  {#each action.commands as command (command.id)}
    <div class="relative step" animate:flip={{ duration: flipDurationMs }}>
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
          <Command {command} {action} isRoot />
        </RuleLine>
      {/if}
    </div>
  {/each}
  {#if !summarize}
    <!-- This is a bit hacky to make a button step. This should go away when we replace DaisyUI and write our own steps UI.
      Or should we not require a button, and just have another dropdown, adding item when picked?

    We disable drag on this item and add custom appearance. Events are now attached to ::after.
    -->
    <div
      class="step step-neutral hover:step-primary cursor-pointer step-button"
      data-content="+"
      on:mouseenter={(event) => (dragDisabled = true)}
      on:mouseleave={(event) => (dragDisabled = false)}
      on:click={(event) => addCommand(action)}
    />
  {/if}
</section>

<style>
  .steps {
    overflow: visible;
  }
  .step-button {
    pointer-events: none;
  }
  .step-button::after {
    pointer-events: all;
  }
</style>
