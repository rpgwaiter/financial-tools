export interface Stonk {
  dividendFrequency?: string
  dividendHistory?: Dividend[]
  dividendsInPastYear?: number
  dividendPerYearPerShare?: number
  dividendYield?: number
  error?: string
  name?: string
  price?: number
  ticker: string
}

export interface Dividend {
  relativeDate: string
  date: Date
  amount: number
}

// Info about a user's relationship to a particular stock
export interface PersonalStonkInfo {
  ticker: string
  amountOwned: number
  averagePurchaseCost?: number // TODO: this maybe?
  stonk?: Stonk | Promise<Stonk>
}

// TODO: user info
// Info about a current session on the site
export interface StonkSession {
  index: number // index into the last item in array
  ownedStonks: PersonalStonkInfo[]
}

