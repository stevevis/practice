type Tickers = {
  [key: string]: Prices;
}

interface Prices {
  readonly bid: number;
  readonly ask: number;
}

type Graph = {
  [key: string]: Node;
}

class Node {
  readonly base: string;
  readonly tickers: Set<string>;

  constructor(base: string) {
    this.base = base;
    this.tickers = new Set<string>();
  }

  public addTicker(ticker: string): void {
    this.tickers.add(ticker);
  }
}

export default class Exchange {
  private readonly tickers: Tickers;
  private readonly graph: Graph;

  constructor(tickers: Tickers) {
    this.tickers = tickers;
    this.graph = {};

    Object.keys(tickers).forEach(ticker => {
      const currencies = ticker.split('-');
      const base = currencies[0];
      const quote = currencies[1];

      if (this.graph[base] === undefined) {
        this.graph[base] = new Node(base);
      }
      
      if (this.graph[quote] === undefined) {
        this.graph[quote] = new Node(quote);
      }

      this.graph[base].addTicker(ticker);
      this.graph[quote].addTicker(ticker);
    });
  }

  public getBestConversion(base: string, amount: number, target: string): number {
    const visited = new Set<string>();
    visited.add(base);
    return this.dfs(base, amount, target, visited);
  }

  private dfs(base: string, amount: number, target: string, visited: Set<string>): number {
    console.log(`Base: ${base}, Amount: ${amount}`);

    if (base === target) {
      return amount;
    }

    const node = this.graph[base];
    let bestConversion = 0;

    node.tickers.forEach(ticker => {
      const currencies = ticker.split('-');
      const nextBase = currencies[0];
      const nextQuote = currencies[1];
      const prices = this.tickers[ticker];
      let conversion = 0;
      
      if (base === nextBase && !visited.has(nextQuote)) {
        const nextAmount = amount * prices.ask;
        visited.add(nextQuote);
        conversion = this.dfs(nextQuote, nextAmount, target, visited);
        visited.delete(nextQuote);
      } else if (base === nextQuote && !visited.has(nextBase)) {
        const nextAmount = amount / prices.bid;
        visited.add(nextBase);
        conversion = this.dfs(nextBase, nextAmount, target, visited);
        visited.delete(nextBase);
      }

      if (conversion > bestConversion) {
        bestConversion = conversion;
      }
    });

    return bestConversion;
  }
}

const tickers: Tickers = {
  'BTC-USD': { bid: 1000, ask: 990 },
  'BTC-EUR': { bid: 600, ask: 580 },
  'ETH-USD': { bid: 500, ask: 480 },
  'ETH-EUR': { bid: 300, ask: 295 },
  'BTC-ETH': { bid: 3, ask: 2 },
};

const exchange = new Exchange(tickers);
console.log(exchange.getBestConversion('USD', 2000, 'EUR'));
