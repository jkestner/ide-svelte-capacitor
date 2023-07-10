<script>
  import { onMount } from "svelte";
  //   import App from "src/App.svelte";
  import Index from "./index.svelte";

  import { register } from "swiper/element/bundle";
  import Monitor from "@components/Monitor.svelte";
  import Rule from "./rule.svelte";

  // register Swiper custom elements
  register();

  onMount(async () => {
    const headSwipe = document.getElementById("headSwipe").swiper;
    const bodySwipe = document.getElementById("bodySwipe").swiper;
    headSwipe.controller.control = bodySwipe;
    bodySwipe.controller.control = headSwipe;
  });
</script>

<div class="main">
  <swiper-container
    id="headSwipe"
    class="text-3xl font-bold m-1"
    slides-per-view={3}
    centered-slides={true}
    center-insufficient-slides={true}
  >
    <swiper-slide class="swiper-slide-active">Monitor </swiper-slide>
    <swiper-slide>Record</swiper-slide>
    <swiper-slide>Notify</swiper-slide>
    <swiper-slide>Automate</swiper-slide>
  </swiper-container>

  <swiper-container
    id="bodySwipe"
    slides-per-view={1}
    centered-slides={true}
    center-insufficient-slides={true}
  >
    <swiper-slide class="swiper-slide-active" lazy="true"
      ><Monitor />
    </swiper-slide>
    <swiper-slide lazy="true">
      <img src="/record.png" />
    </swiper-slide>
    <swiper-slide lazy="true">
      <img src="/automate.png" />
    </swiper-slide>
    <swiper-slide lazy="true">
      <Rule />
    </swiper-slide>
  </swiper-container>
</div>

<style>
  .main {
    text-align: center;
  }
  swiper-slide {
    opacity: 0.5;
  }
  swiper-slide.swiper-slide-active {
    opacity: 1;
  }
</style>
