<script lang="ts">
  import StonkSearch from "../components/forms/StonkSearch.svelte";
  import StonkInfoSummary from "../components/infographics/StonkInfoSummary.svelte";
  import StonkListSummary from "../components/infographics/StonkListSummary.svelte";
  import type { PersonalStonkInfo, Stonk, StonkSession } from "../types/Stonk";

  export let stonkSession: StonkSession = {
    ownedStonks: [],
    index: 0
  };

  // Keeps an index of the last array item, unsure if this is really needed
  $: stonkSession.index = stonkSession.ownedStonks.length <= 0 ? 0 : stonkSession.ownedStonks.length - 1

</script>

<div class="max-w-[1400px] mx-auto flex">
  <div class="grid w-full grid-flow-col grid-rows-3 gap-4">
    <div class="col-span-2 min-h-screen items-center flex flex-col">
      <StonkSearch bind:stonkSession />
    </div>

    <div class="row-span-3 items-center flex flex-col mb-2">
      <StonkListSummary bind:stonkSession />
    </div>
    {#if stonkSession.ownedStonks.length > 0}
    <div class="row-span-3 items-center flex flex-col mb-2">
      <StonkInfoSummary bind:stonkSession />
    </div>
    {/if}
  </div>
</div>
