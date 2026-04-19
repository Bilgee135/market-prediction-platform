import os
from datetime import datetime
import pandas as pd
import yfinance as yf
from sqlalchemy import create_engine
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../backend/.env'))

DB_HOST     = os.getenv('DB_HOST')
DB_PORT     = os.getenv('DB_PORT', '3306')
DB_USER     = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME     = os.getenv('DB_NAME')

engine = create_engine(
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}",
    connect_args={"ssl": {"ssl_disabled": False}}
)

def fetch_and_store():
    ticker = yf.Ticker("^GSPC")
    df = ticker.history(start="2022-01-01",
                        end=datetime.today().strftime("%Y-%m-%d"),
                        interval="1wk")

    df = df.reset_index()
    df = df.rename(columns={
        'Date':   'date',
        'Open':   'open',
        'High':   'high',
        'Low':    'low',
        'Close':  'close',
        'Volume': 'volume',
    })

    df['date']   = pd.to_datetime(df['date']).dt.date
    df['open']   = df['open'].round(2)
    df['high']   = df['high'].round(2)
    df['low']    = df['low'].round(2)
    df['close']  = df['close'].round(2)
    df['volume'] = df['volume'].astype(int)

    df = df[['date', 'open', 'high', 'low', 'close', 'volume']]

    with engine.connect() as conn:
        conn.execute(text("DELETE FROM historical_prices"))
        conn.commit()

    df.to_sql('historical_prices', con=engine, if_exists='append', index=False)
    print(f"Stored {len(df)} weekly candles from {df['date'].min()} to {df['date'].max()}")

if __name__ == "__main__":
    fetch_and_store()