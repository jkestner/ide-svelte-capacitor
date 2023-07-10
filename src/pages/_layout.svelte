<!-- _layout.svelte -->
<script context="module">
  export const load = async ({ page }) => ({
    props: { key: page.path },
  });
</script>

<script>
  import "/public/global.css";

  import Header from "@components/Header.svelte";
  import Transition from "@components/transitions/Transition.svelte";
  import { url, layout, route, page } from "@roxi/routify";
  import { fade, fly, slide } from "svelte/transition";

  console.log($route);
  console.log($page);

  let firstName = "Pickup";
  let lastName = "Truck";
  $: fullName = firstName.toUpperCase();

  const configs = [
    {
      condition: () => true,
      transition: slide,
      inParams: { duration: 2000, x: 300 },
      outParams: { duration: 2000 },
    },
  ];
</script>

<div class="m-2 container mx-auto text-sm">
  <Header />
  <div class="m-2 container mx-auto">
    <slot decorator={Transition} {configs} />
  </div>
</div>
