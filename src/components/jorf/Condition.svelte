<script>
  import RuleLine from "@components/ide/RuleLine.svelte";

  import * as state from "@store/program.js";
  import { program } from "@store/program.js";
  import Expression from "./Expression.svelte";
  import { dndzone, SOURCES, TRIGGERS } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let condition;
  export let summarize;

  const flipDurationMs = 300;
  let dragDisabled = true;

  function handleConsider(e) {
    const {
      items: newItems,
      info: { source, trigger },
    } = e.detail;
    condition.expressions = newItems;
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
    condition.expressions = newItems;
    // Ensure dragging is stopped on drag finish via pointer (mouse, touch)
    if (source === SOURCES.POINTER) {
      dragDisabled = true;
    }
  }

  async function addExpression(condition) {
    condition.expressions.push({
      id: Math.floor(Math.random() * 999),
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
    $program = $program;
  }

  function removeExpression(value) {
    //todo: make sure this is a unique item with a key
    let b = condition.expressions.filter((obj) => obj != value);
    condition.expressions = b;
    state.update();
  }
  function summary(expression) {
    return (
      (expression.left.value.label || expression.left.value) +
      " " +
      expression.op.op +
      " " +
      (expression.right.value.label || expression.right.value)
    );
  }
</script>

<section
  use:dndzone={{
    items: condition.expressions,
    flipDurationMs,
    dragDisabled,
    type: "expression",
    dropTargetStyle: { outline: "none" },
    dropTargetClasses: ["bg-primary", "opacity-10"],
  }}
  on:consider={handleConsider}
  on:finalize={handleFinalize}
  class="steps steps-vertical"
  style="overflow:visible"
>
  {#each condition.expressions as expression (expression.id)}
    <div class="relative step" animate:flip={{ duration: flipDurationMs }}>
      <!-- workaround so that elements that have a svelte component (with bindings?) don't disappear when drag/dropping-->
      {#if expression.isDndShadowItem}
        <div>
          {expression.left.value.label || expression.left.value}
          {expression.op.op}
          {expression.right.value.label || expression.right.value}
        </div>
      {:else}
        <RuleLine
          item={expression}
          collection={condition.expressions}
          remove={() => removeExpression(expression)}
          {summarize}
          summary={summary(expression)}
          key={expression.id}
          draggable
          bind:dragDisabled
        >
          <Expression {expression} isRoot />
        </RuleLine>
      {/if}
    </div>
  {/each}

  <!-- //TODO: This is a bit hacky to make a button step. This should go away when we replace DaisyUI and write our own steps UI.
      Or should we not require a button, and just have another dropdown, adding item when picked?

    We disable drag on this item and add custom appearance. Events are now attached to ::after.
    -->
  {#if !summarize}
    <div
      class="step step-neutral hover:step-primary cursor-pointer step-button"
      data-content="+"
      on:mouseenter={(event) => (dragDisabled = true)}
      on:mouseleave={(event) => (dragDisabled = false)}
      on:click={(event) => addExpression(condition)}
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
