<script>
  import Literal from "./Literal.svelte";
  import { nodes } from "@store/nodes";

  import LedOutput from "./outputs/LedOutput.svelte";
  import EmailOutput from "./outputs/EmailOutput.svelte";
  import GPOutput from "./outputs/GPOutput.svelte";
  import LogOutput from "./outputs/LogOutput.svelte";
  import TwitterOutput from "./outputs/TwitterOutput.svelte";
  import SMSOutput from "./outputs/SMSOutput.svelte";
  import StateOutput from "./outputs/StateOutput.svelte";
  import HTTPOutput from "./outputs/HTTPOutput.svelte";
  import MicroPythonOutput from "./outputs/MicroPythonOutput.svelte";
  import MQTTOutput from "./outputs/MQTTOutput.svelte";

  const outputs = [
    {
      label: "LED",
      value: "led",
      level: "node",
      component: LedOutput,
    },
    {
      label: "Set pin",
      value: "gpout",
      level: "node",
      component: GPOutput,
    },
    {
      label: "Set relay",
      value: "relay",
      level: "node",
      component: GPOutput,
    },
    {
      label: "Email",
      value: "email",
      level: "network",
      component: EmailOutput,
    },
    {
      label: "Log",
      value: "log",
      level: "network",
      component: LogOutput,
    },
    {
      label: "Tweet",
      value: "twitter",
      level: "network",
      component: TwitterOutput,
    },
    {
      label: "Call URL",
      value: "httpout",
      level: "network",
      component: HTTPOutput,
    },
    {
      label: "Run MicroPython code",
      value: "mpythonout",
      level: "network",
      component: MicroPythonOutput,
    },
    {
      label: "Post to MQTT",
      value: "mqttout",
      level: "network",
      component: MQTTOutput,
    },
    {
      label: "Text",
      value: "sms",
      level: "network",
      component: SMSOutput,
    },
    {
      label: "Set state",
      value: "state",
      level: "network",
      component: StateOutput,
    },
  ];

  export let command;
  export let isRoot = false;

  // Populating autocomplete menu with, basically, JLiteral objects
  //TODO: is this reactive? needs to be
  let nodeOutputs = [];
  $nodes.forEach((n) => {
    n.actuators.forEach((s) =>
      nodeOutputs.push({
        label: s.label,
        description: s.label,
        value: s.label,
        component: s.label,
        node: n.id,
        nodeName: n.label,
      })
    );
  });

  let networkOutputs = outputs.filter((o) => o.level === "network");

  function selectedComponent(componentName) {
    let c = outputs.find((i) => i.value == componentName);
    if (c) return c.component;
    else return null;
  }
</script>

<div class="flex flex-auto flex-wrap p-1 mb-2 {isRoot ? '' : 'ml-3'}">
  <Literal
    autocomplete
    vocabulary={[...nodeOutputs, ...networkOutputs]}
    bind:value={command.command}
  />
  {#if selectedComponent(command.command.value)}
    <svelte:component
      this={selectedComponent(command.command.value)}
      bind:value={command.value}
      bind:params={command.params}
    />
  {/if}
</div>
