<script>
  import RuleLine from "@components/ide/RuleLine.svelte";

  import * as state from "@store/program.js";
  import { program } from "@store/program.js";
  import Command from "./Command.svelte";
  import { dndzone, SOURCES, TRIGGERS } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let action;
  export let summarize;

  const flipDurationMs = 300;
  let dragDisabled = true;

  function handleConsider(e) {
    const {
      items: newItems,
      info: { source, trigger },
    } = e.detail;
    action.commands = newItems;
    // Ensure dragging is stopped on drag finish via keyboard
    if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
      dragDisabled = true;
    }
  }
  function handleFinalize(e) {
    const {
      items: newItems,
      info: { source },
    } = e.detail;
    action.commands = newItems;
    // Ensure dragging is stopped on drag finish via pointer (mouse, touch)
    if (source === SOURCES.POINTER) {
      dragDisabled = true;
    }
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
  use:dndzone={{
    items: action.commands,
    flipDurationMs,
    dragDisabled,
    type: "command",
    dropTargetStyle: { outline: "none" },
    dropTargetClasses: ["bg-primary", "opacity-10"],
  }}
  on:consider={handleConsider}
  on:finalize={handleFinalize}
  class="steps steps-vertical"
>
  {#each action.commands as command (command.id)}
    <div class="relative step" animate:flip={{ duration: flipDurationMs }}>
      <!-- workaround so that elements that have a svelte component (with bindings?) don't disappear when drag/dropping-->
      {#if command.isDndShadowItem}
        <div>{command.command}</div>
      {:else}
        <RuleLine
          item={command}
          collection={action.commands}
          remove={() => removeCommand(command)}
          {summarize}
          summary={command.command}
          key={command.id}
          draggable
          bind:dragDisabled
        >
          <Command {command} isRoot />
        </RuleLine>
      {/if}
    </div>
  {/each}

  <!-- This is a bit hacky to make a button step. This should go away when we replace DaisyUI and write our own steps UI.
      Or should we not require a button, and just have another dropdown, adding item when picked?

    We disable drag on this item and add custom appearance. Events are now attached to ::after.
    -->
  {#if !summarize}
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
  }
  .steps-vertical {
    grid-auto-rows: min-content;
  }
  .steps-vertical .step:before {
    width: 0.25rem;
    --tw-translate-y: 0rem;
    /* background-color: blue; */
  }
  .steps-vertical .step:first-child:before {
    /* height: calc(100% + 3rem); */
    --tw-translate-y: 2rem;
    /* background-color: red; */
    content: "";
  }
  .steps-vertical .step:last-child:before {
    --tw-translate-y: -2rem;
  }
  .steps .step:after {
    place-self: start center;
    margin-top: 1.25em;
  }
  .step-button {
    pointer-events: none;
  }
  .step-button:after {
    pointer-events: all;
  }
  .step:before {
    align-items: initial;
  }
</style>
