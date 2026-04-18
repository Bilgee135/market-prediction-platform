"""
This script fetches the latest price and percentage change for a predefined
list of stock symbols using the yfinance library. The results are printed in
JSON format, which can be consumed by the frontend to display a ticker tape.
"""

import json
import sys
import yfinance as yf
import requests

SYMBOLS = ['SPY', 'AAPL', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META', 'TSLA', 'JPM']

def fetch_ticker_data():
    """
    Fetches the latest price and percentage change for each symbol in SYMBOLS.
    """
    results = []

    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })

    try:
        raw_data = yf.download(
            tickers=SYMBOLS,
            period='5d',
            group_by='ticker',
            auto_adjust=True,
            progress=False,
            threads=False,
            session=session
        )

        for symbol in SYMBOLS:
            display_name = 'S&P 500' if symbol == 'SPY' else symbol

            try:
                close_prices = raw_data[symbol]['Close'].dropna()

                if len(close_prices) < 2:
                    print(f"Not enough data for {symbol}", file=sys.stderr)
                    results.append({
                        'symbol': display_name,
                        'price': None,
                        'change': None,
                    })
                    continue

                last_price = close_prices.iloc[-1]
                previous_close = close_prices.iloc[-2]
                change_percent = ((last_price - previous_close) / previous_close) * 100

                results.append({
                    'symbol': display_name,
                    'price':  round(float(last_price), 2),
                    'change': round(float(change_percent), 2),
                })

            except Exception as e:
                print(f"Error processing {symbol}: {e}", file=sys.stderr)
                results.append({
                    'symbol': display_name,
                    'price': None,
                    'change': None,
                })

    except Exception as e:
        print(f"Download failed: {e}", file=sys.stderr)

    print(json.dumps(results))

fetch_ticker_data()