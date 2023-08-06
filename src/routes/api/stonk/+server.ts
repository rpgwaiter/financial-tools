import { json } from '@sveltejs/kit'
import yahooFinance from 'yahoo-finance2'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import type { RequestEvent } from './$types'

dayjs.extend(relativeTime)

const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

// Adjust with edge cases
const getDividendFrequency = (divsPerYear: number) => {
  let dividendFrequency: string
  console.log('DIVSPERYEAR:', divsPerYear)
  switch (divsPerYear) {
    case 11:
    case 12:
      dividendFrequency = 'Monthly'
      break;
    case 3:
    case 4:
      dividendFrequency = 'Quarterly'
      break;
    case 1:
      dividendFrequency = 'Yearly'
      break;
    case 0:
    case null:
    case undefined:
      dividendFrequency = '<= 1 per year'
      break;
    default:
      dividendFrequency = `<= ${divsPerYear + 1} per year`
      break;
  }
  return dividendFrequency
}


async function getChart(ticker: string, raw = false) {
  return yahooFinance
    ._chart(ticker, { period1: oneYearAgo.toDateString() })
    .then(stonk => {
      const dividendsInPastYear = stonk.events?.dividends?.length || 0

      return {
        ticker: stonk.meta.symbol,
        dividendFrequency: getDividendFrequency(dividendsInPastYear),
        dividendsInPastYear,
        dividendHistory: stonk.events?.dividends?.map(d => ({ relativeDate: dayjs().to(dayjs(d.date)), ...d }))?.reverse() || [],
        // raw: raw ? stonk : null
      }
    }
    )
    .catch(e => ({
      error: e.message
    }))
}

async function getQuote(ticker: string, raw = false) {
  const ret = yahooFinance.quote(ticker)
  // console.log(JSON.stringify(ret))
  return ret.then(r => ({
    name: r.longName || r.shortName,
    dividendYield: r.dividendYield || 0,
    dividendPerYearPerShare: r.regularMarketPrice ? (r.regularMarketPrice * r.dividendYield * 0.01) : 0,
    price: r.regularMarketPrice
    // raw: raw ? r : null
  }
  ))
}



export async function POST(event: RequestEvent) {
  const data = await event.request.formData()
  const ticker: string = `${data.get('ticker')}`

  // const quoteData = await getQuote(ticker)
  // console.log(JSON.stringify(quoteData))

  console.log('TICKER:', ticker)
  const raw = !!data.get('raw')

  // const quote = 

  return Promise.all([ // does this always fetch from the browser?
    getQuote(ticker, raw),
    getChart(ticker, raw)
  ]).then(r => json(r.reduce((acc, currObj) => ({ ...acc, ...currObj }), {})))

}
