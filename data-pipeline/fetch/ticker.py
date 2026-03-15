import yfinance as yf
import json 
import sys

SYMBOLS = ['SPY', 'AAPL', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META', 'TSLA', 'JPM']

# SPY is the S&P 500 ETF, which tracks the performance of the S&P 500 index.

def fetch_ticker_data():
    results = []

    try:
        # Download all symbols in a single HTTP request
        # group_by='ticker' organises the returned DataFrame by symbol
        # so each one can accessed with: raw_data['AAPL']['Close']
        raw_data = yf.download(
            tickers=SYMBOLS,
            period='5d',
            group_by='ticker',
            auto_adjust=True,
            progress=False,  # suppresses the download progress bar from polluting stdout
            threads=False # prevents requests to trigger rate limiting 
        )

        for symbol in SYMBOLS:
            display_name = 'S&P 500' if symbol == 'SPY' else symbol

            try:
                # Extract the Close price column for this specific symbol
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
        # If the download itself fails entirely, log it
        print(f"Download failed: {e}", file=sys.stderr)

    print(json.dumps(results))

fetch_ticker_data()
