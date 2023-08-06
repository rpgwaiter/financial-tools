<script lang="ts">
  // This is like the +/- button on the stock list
  import type { PersonalStonkInfo, Stonk } from "../../types/Stonk";

  export let myCurrentStonk: PersonalStonkInfo

  export let stonk: Stonk // TODO: rethink this

  function adjustCurrentStonk(event: Event) {
    const form = event?.target as HTMLFormElement;
    myCurrentStonk.amountOwned = +((new FormData(form)).get("amountOwned") || 0);
  }

</script>


<div class="w-24 mx-2 inline">
  <div class="flex h-8 rounded-lg border border-gray-300 overflow-hidden">
    <button class="px-2 bg-gray-200 focus:outline-none" on:click={() => myCurrentStonk.amountOwned <= 0 ? myCurrentStonk.amountOwned = 0 : myCurrentStonk.amountOwned--}>-</button>
    <div class="form inline">
      <form on:submit|preventDefault={adjustCurrentStonk}>
        <input
          type="text"
          class="inline h-8 border border-gray-600 text-sm focus:border-blue-500 w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500"
          name="amountOwned"
          value={myCurrentStonk.amountOwned}
        />
      </form>
    </div>
    <button class="px-2 bg-gray-200 focus:outline-none" on:click={() => myCurrentStonk.amountOwned++}>+</button>
  </div>
</div>


