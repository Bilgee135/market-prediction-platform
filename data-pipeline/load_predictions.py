'''
This script loads the CSV files of model predictions into the MySQL database.
'''

import os
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv

# Point dotenv at the backend .env file so we reuse the same credentials
load_dotenv(os.path.join(os.path.dirname(__file__), '../backend/.env'))

DB_HOST     = os.getenv('DB_HOST', 'localhost')
DB_PORT     = os.getenv('DB_PORT', '3306')
DB_USER     = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME     = os.getenv('DB_NAME')

if not DB_USER:
    raise RuntimeError("DB credentials not loaded - check the .env path")

engine = create_engine(
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}",
    connect_args={"ssl": {"ssl_disabled": False}}
)

CSV_DIR = os.path.join(os.path.dirname(__file__), '../database/')

# Clean model names for the model_name column in the DB
# Keys must match the filenames exactly (without .csv)
MODEL_NAME_MAP = {
    'Linear_Regression_Predictions_2026-04-18_13-42-57': 'Linear Regression',
    'random_forest_2026-04-18_13-38-37':                 'Random Forest',
    'SVR':                                                'SVR',
    'LSTM': 'LSTM',
    'Modularised_ANN_2026-04-14_22-26-20':                                    'ANN',
    'Modularised_CNN_LSTM_DETERMINISTIC_VERSION_V2_2026-04-14_22-26-21':      'CNN-LSTM-DET',
    'Modularised_CNN-LSTM_2026-04-14_22-26-21':                               'CNN-LSTM',
    'Modularised_DTR_2026-04-14_22-26-21':                                    'DTR',
    'Modularised_GRU_2026-04-14_22-26-21':                                    'GRU',
    'Modularised_GRU_For_All_Value_Predictors_2026-04-14_22-26-21':           'GRU-ALL',
    'Modularised_KNN_2026-04-14_22-26-21':                                    'KNN',
    'Modularised_KNN_With_Pattern_Matching_2026-04-14_22-26-21':              'KNN-PM',
    'Modularised_KNN_With_Pattern_Matching_Predicting_PRICES_2026-04-14_22-26-21': 'KNN-PM-PRICES',
}


def normalise_date_column(df):
    """
    The date column has three different names across files:
      - 'Unnamed: 0'  (most files - pandas default when index has no name)
      - 'Date'        (DTR)
      - the previous CSV's filename (GRU - a bug in the ML team's output code)
    This function finds whichever one it is and renames it to 'prediction_date'.
    """
    for col in df.columns:
        # Try parsing the first value of this column as a date
        # If it succeeds, this is the date column regardless of its name
        try:
            pd.to_datetime(df[col].iloc[0])
            df = df.rename(columns={col: 'prediction_date'})
            return df
        except (ValueError, TypeError):
            continue
    raise ValueError("Could not find a date column in this CSV")


def load_csv(filename, model_name):
    path = os.path.join(CSV_DIR, f"{filename}.csv")
    df = pd.read_csv(path)

    # Fix whichever date column name was used
    df = normalise_date_column(df)

    # Parse the date column properly - MySQL DATE type needs a real datetime, not a string
    df['prediction_date'] = pd.to_datetime(df['prediction_date'])

    # Add the model identifier - this isn't in the CSV, we derive it from the filename
    df['model_name'] = model_name

    # Map CSV column names to schema column names
    # Only 'close' maps to 'predicted_close' - that's all the schema stores right now
    # Handle both column naming conventions across different ML team outputs
    if 'Predicted_Close' in df.columns:
        df = df.rename(columns={'Predicted_Close': 'predicted_close'})
    elif 'target_close' in df.columns:
        df = df.rename(columns={'target_close': 'predicted_close'})
    elif 'close' in df.columns:
        df = df.rename(columns={'close': 'predicted_close'})

    # Select only the columns your schema has
    # actual_close, rmse, mae, directional_accuracy will be NULL (not in CSV)
    columns_to_load = ['model_name', 'prediction_date', 'predicted_close']
    df = df[columns_to_load]

    # Drop any rows with no predicted close value
    df = df.dropna(subset=['predicted_close'])

    # Write to DB
    # if_exists='append' - add rows to existing table, don't drop and recreate
    # index=False        - don't write the pandas 0,1,2... row index as a column
    df.to_sql('predictions', con=engine, if_exists='append', index=False, method='multi')

    print(f"  Loaded {len(df)} rows for {model_name}")

if __name__ == "__main__":
    for filename, model_name in MODEL_NAME_MAP.items():
        print(f"Processing {model_name}...")
        try:
            load_csv(filename, model_name)
        except Exception as e:
            print(f"  FAILED: {e}")

    print("\nDone.")