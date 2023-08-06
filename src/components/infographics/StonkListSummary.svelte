<script lang="ts">
  import StonkPurchase from '../forms/StonkPurchase.svelte'
  import StonkListItem from './StonkListItem.svelte'
  import { onMount } from 'svelte'

  import type { Stonk, StonkSession } from '../../types/Stonk'

  export let stonkSession: StonkSession

  // onMount(async () => {
  //   if (stonkSession.ownedStonks && stonkSession.ownedStonks.length > 0) {
  //     stonkSession.currentStonks = await Promise.all(
  //       stonkSession.ownedStonks?.map(i => fetch("/api/stonk", {
  //         method: "POST",
  //         body: JSON.stringify({ ticker: i.ticker }),
  //       }).then((r) => r.json()) ) || []
  //     ).then(r => [ ...stonkSession.currentStonks as Stonk[], r ]) as Stonk[]
  //   }

  // })
</script>

{#each stonkSession.ownedStonks as myCurrentStonk}
  <StonkListItem bind:myCurrentStonk />
{/each}
<!-- {#each stonkSession.ownedStonks as myCurrentStonk}
  <div class="w-full border border-fuchsia-500 bg-neutral-800">
    {#await myCurrentStonk.stonk}
      [{myCurrentStonk.ticker}] - Loading info....
    {:then realStonk} 
    <div class="flex items-center h-6 m-2 font-extrabold px-5 py-4"> {realStonk?.name || myCurrentStonk.ticker} | <StonkPurchase bind:myCurrentStonk={myCurrentStonk} ></StonkPurchase> </div>
      <StonkListItem bind:myCurrentStonk={myCurrentStonk}></StonkListItem>
    {/await}
    
  </div>
{/each} -->
