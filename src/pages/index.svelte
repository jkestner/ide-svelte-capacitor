<script>
  import { onMount } from "svelte";

  import { register } from "swiper/element/bundle";
  import Monitor from "@components/Monitor.svelte";
  import Record from "@components/Record.svelte";
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
    center-insufficient-slides={false}
    hash-navigation-watch-state={true}
  >
    <swiper-slide class="swiper-slide-active" data-hash="monitor"
      >Monitor</swiper-slide
    >
    <swiper-slide data-hash="record">Record</swiper-slide>
    <swiper-slide data-hash="automate">Automate</swiper-slide>
    <swiper-slide data-hash="notify">Notify</swiper-slide>
  </swiper-container>

  <swiper-container
    id="bodySwipe"
    slides-per-view={1}
    centered-slides={true}
    center-insufficient-slides={false}
    hash-navigation={{ watchState: true }}
  >
    <swiper-slide class="swiper-slide-active" lazy="true">
      <!-- <Rule /> -->
      <Monitor />
    </swiper-slide>
    <swiper-slide lazy="true">
      <Record />
    </swiper-slide>
    <swiper-slide lazy="true">
      <Rule />
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
