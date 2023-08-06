<script lang="ts">
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';
  import type { StonkSession } from '../../types/Stonk';
  export let stonkSession: StonkSession;

  export let yearlySummaryCanvas: HTMLCanvasElement | undefined; // should never be undefined except for right on component load

  let yearlyDivs: number[] = []
  let yearlyDivsTotal: number = 0

  let ctx: CanvasRenderingContext2D | undefined | null;
  $: ctx = yearlySummaryCanvas && yearlySummaryCanvas.getContext('2d')
  let yearlySummaryChart: Chart | undefined
  $: yearlySummaryChart = yearlySummaryChart
    ? yearlySummaryChart
    : ctx && !yearlySummaryChart && new Chart(ctx, { // loads the chart as soon as the page loads, only once
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'Returns',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [...chartLabels.map(() => 0)],
            },
          ],
        },
      }) || undefined

  let chartLabels = ['1 year', '2 years', '3 years']; // TODO: this

  const generateChart = async () => {
    return Promise.all(stonkSession.ownedStonks.map((i) => i.stonk)).then((r) => {
      if (yearlySummaryChart) {
        yearlyDivs = r.map((stonk, index) => (stonk?.dividendPerYearPerShare || 0) * (stonkSession.ownedStonks[index].amountOwned || 0))
        yearlyDivsTotal = yearlyDivs.reduce((a, c) => a + c, 0)
        yearlySummaryChart.data.datasets.forEach(dataSet => {
          dataSet.data = [...chartLabels.map((_, i) => yearlyDivsTotal * (i + 1))]
        })
        yearlySummaryChart.update()
      }
    })
  }

  $: stonkSession.ownedStonks && generateChart()


  $: stonkSession.index && stonkSession.ownedStonks.map(({ stonk }, index) => (stonk?.dividendPerYearPerShare || 0) * (stonkSession.ownedStonks[index].amountOwned || 0)).reduce((a, c) => a + c, 0) && generateChart()

</script>

<div>
  <canvas bind:this={yearlySummaryCanvas} id="myChart" />
  <div>Total Returns: </div>
  <div>1 year: ${yearlyDivsTotal.toFixed(2)}</div>
  <div>2 years: ${(yearlyDivsTotal * 2).toFixed(2)}</div>
  <div>5 years: ${(yearlyDivsTotal * 5).toFixed(2)}</div>
  <div>10 years: ${(yearlyDivsTotal * 10).toFixed(2)}</div>
  <div>20 years: ${(yearlyDivsTotal * 20).toFixed(2)}</div>
</div>
