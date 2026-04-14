"""
This script fetches historical weekly OHLCV 
data for the S&P 500 index using the yfinance library. 
It retrieves the data for a specified number of weeks 
and prints it in JSON format to stdout. Each candle
in the output includes the date, open price, high price, 
low price, close price, and volume for that week.
"""
import sys
import json
import yfinance as yf


def fetch_weekly_candles(weeks=26):
    """Fetches historical weekly OHLCV candles for the S&P 500 and prints JSON to stdout."""
    ticker = yf.Ticker("^GSPC")
    df = ticker.history(period=f"{weeks * 2}d", interval="1wk")
    df = df.tail(weeks)

    candles = []
    for date, row in df.iterrows():
        candles.append({
            "date":   date.strftime("%Y-%m-%d"),
            "open":   round(float(row["Open"]),  2),
            "high":   round(float(row["High"]),  2),
            "low":    round(float(row["Low"]),   2),
            "close":  round(float(row["Close"]), 2),
            "volume": int(row["Volume"]),
        })

    print(json.dumps(candles))


if __name__ == "__main__":
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 26
    fetch_weekly_candles(n)
    