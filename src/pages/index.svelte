<script>
  import NodeList from "@components/NodeList.svelte";
  import RuleList from "@components/RuleList.svelte";
  //   import App from "src/App.svelte";
  import Index from "./index.svelte";
</script>

<div class="main">
  <h1 class="text-4xl font-bold m-1">Monitor</h1>

  <!-- <div class="tabs tabs-boxed">
    <a class="tab tab-active" href="node">Monitor</a>
    <a class="tab" href="rule">Record</a>
    <a class="tab" href="rule">Notify</a>
    <a class="tab" href="rule">Automate</a>
    <a class="tab">Map</a>
  </div> -->

  <NodeList />
</div>

<style>
  .main {
    text-align: center;
    margin: 50px auto;
  }
</style>
