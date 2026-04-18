"""
This script fetches historical weekly S&P 500 data from Yahoo Finance using the yfinance library
"""

from datetime import datetime
import json
import yfinance as yf

# Made to fetch from a specific date instead of relying on weeks
def fetch_weekly_candles():
    """
    Fetches historical weekly S&P 500 data from Yahoo Finance using the yfinance library.
    The data includes open, high, low, close, and volume for each week.
    The results are printed as a JSON array of candle objects.
    """

    ticker = yf.Ticker("^GSPC")
    df = ticker.history(start="2022-01-01", 
                        end=datetime.today().strftime("%Y-%m-%d"), 
                        interval="1wk")

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
    fetch_weekly_candles()