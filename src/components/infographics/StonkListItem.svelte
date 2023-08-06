<script lang="ts">
  import StonkPurchase from "../forms/StonkPurchase.svelte";
  import type { PersonalStonkInfo, Stonk } from "../../types/Stonk";
  export let myCurrentStonk: PersonalStonkInfo;
</script>


<div class="py-1"></div>
<div class="w-full border border-fuchsia-500 bg-neutral-800">
  {#await myCurrentStonk.stonk}
    <div class="flex items-center h-6 m-2 font-extrabold px-5 py-4">[{myCurrentStonk.ticker}] - Loading Stock info.... </div>
  {:then realStonk} 
    {#if realStonk}
      <div class="flex items-center h-6 m-2 font-extrabold px-5 py-4"> {realStonk?.name || myCurrentStonk.ticker} <StonkPurchase bind:myCurrentStonk={myCurrentStonk} stonk={realStonk} ></StonkPurchase> </div>
      
      <div class="flex items-center px-5 py-2">You'll make roughly ${((myCurrentStonk.amountOwned || 0)  * (realStonk.dividendPerYearPerShare || 0)).toFixed(2)} per year with ${((myCurrentStonk.amountOwned || 0) * (realStonk.price || 0)).toFixed(2)} total invested</div>
      <div class="px-5 py-4 border-t border-green-600 border-dashed">
          <strong>[{realStonk.ticker}]</strong> has <code>{realStonk.dividendFrequency}</code> dividends, with an average {realStonk.dividendYield || 0}% return per year
      </div>
    {/if}
  {/await}
  
</div>



