<script lang="ts">
  import { CodeBlock } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import type { Stonk, StonkSession } from "../../types/Stonk";

  export let stonkSession: StonkSession

  export async function getStonkInfo(ticker: string): Promise<Stonk> {
    let data = new FormData();
    data.append("ticker", ticker)

    return fetch("/api/stonk", { method: "POST", body: data }).then((r) => r.json())//.then(r => { console.log(JSON.stringify(r)); return r})
  }

  const validateTicker = (event: Event) => {
    const ticker = `${(new FormData(event?.target as HTMLFormElement)).get("ticker")}`.toLowerCase()
    if (!stonkSession.ownedStonks.map(i => i.ticker).includes(ticker)) { // no dupes
      stonkSession.ownedStonks = [ ...stonkSession.ownedStonks, { ticker, amountOwned: 0, stonk: getStonkInfo(ticker) } ]
    }
  }
</script>

<main class="mb-auto h-10">
  <h3>Type in a stock name</h3>

  <div class="form">
    <form on:submit|preventDefault={validateTicker}>
      <input
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="ticker"
      />
      <input type="checkbox" name="raw" />Include Raw?
      <button
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >Get Stonk Info</button
      >
    </form>
  </div>

  {#if stonkSession.ownedStonks[stonkSession.index]}
    {#await stonkSession.ownedStonks[stonkSession.index].stonk}
      <p>...Grabbing data from Yahoo Finance...</p>
    {:then raw}
      <CodeBlock language="json" code={JSON.stringify(raw, null, 2)} />
    {/await}
  {/if}
</main>
