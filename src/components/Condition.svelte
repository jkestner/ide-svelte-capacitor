<script>
  import * as state from "@store/program.js";
  import Expression from "./Expression.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let condition;
  export let summarize;

  function handleSort(e) {
    condition.expressions = e.detail.items;
  }
  const flipDurationMs = 300;
</script>

{#each condition.expressions as item (item.id)}
  {item.id} -
{/each}

<!-- abstract this so Condition, Action, etc are inside a draggable row with close/drag widgets, responsive -->
<section
  use:dndzone={{ items: condition.expressions, flipDurationMs: 300 }}
  on:consider={handleSort}
  on:finalize={handleSort}
>
  {#each condition.expressions as expression (expression.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <!-- workaround so that elements that have a svelte component (with bindings?) don't disappear when drag/dropping-->
      {#if expression.isDndShadowItem}
        <div>
          {expression.left.value.label}
          {expression.op.op}
          {expression.right.value}
        </div>
      {:else if summarize}
        <div>
          {expression.left.value.label}
          {expression.op.op}
          {expression.right.value}
        </div>
      {:else}
        <Expression {expression} {condition} isRoot />
      {/if}
    </div>
  {/each}
</section>
