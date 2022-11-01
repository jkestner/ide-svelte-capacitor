<script>
  import Output from "./Output.svelte";
  import Expression from "@components/jorf/Expression.svelte";
  import VariableInserter from "@components/VariableInserter.svelte";

  export let params = {};

  export function summary() {
    return "state";
  }
</script>

<Output {summary}>
  <Expression
    expression={{
      column: 3,
      left: {
        Literal: {
          value: "meow",
        },
      },
      lineno: 32,
      op: {
        Operator: {
          op: "==",
        },
      },
      right: {
        Literal: {
          value: "1+2+3",
        },
      },
    }}
    condition="3"
  />
</Output>
