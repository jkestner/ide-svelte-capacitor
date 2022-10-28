<script>
  import RuleLine from "./ide/RuleLine.svelte";

  import PartPicker from "./PartPicker.svelte";
  import LedOutput from "./outputs/LedOutput.svelte";
  import EmailOutput from "./outputs/EmailOutput.svelte";
  import GPOutput from "./outputs/GPOutput.svelte";
  import LogOutput from "./outputs/LogOutput.svelte";
  import TwitterOutput from "./outputs/TwitterOutput.svelte";
  import SMSOutput from "./outputs/SMSOutput.svelte";
  import StateOutput from "./outputs/StateOutput.svelte";
  import HTTPOutput from "./outputs/HTTPOutput.svelte";

  const commands = [
    {
      label: "LED",
      value: "led",
      component: LedOutput,
    },
    {
      label: "Email",
      value: "email",
      component: EmailOutput,
    },
    {
      label: "Log",
      value: "log",
      component: LogOutput,
    },
    {
      label: "Set pin",
      value: "gpout",
      component: GPOutput,
    },
    {
      label: "Tweet",
      value: "twitter",
      component: TwitterOutput,
    },
    {
      label: "Call URL",
      value: "httpout",
      component: HTTPOutput,
    },
    {
      label: "Text",
      value: "sms",
      component: SMSOutput,
    },
    {
      label: "Set state",
      value: "state",
      component: StateOutput,
    },
  ];

  export let command;
  export let action;
</script>

<RuleLine item={command} collection={action.commands}>
  <div class=" mb-2">
    <PartPicker
      vocabulary={commands}
      bind:value={command.command}
      bind:params={command.params}
    />
  </div>
</RuleLine>
