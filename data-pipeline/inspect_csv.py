import pandas as pd
import os

csv_dir = '../database/'

files = [
    'Modularised_ANN_2026-04-14_22-26-20',
    'Modularised_CNN_LSTM_DETERMINISTIC_VERSION_V2_2026-04-14_22-26-21',
    'Modularised_CNN-LSTM_2026-04-14_22-26-21',
    'Modularised_DTR_2026-04-14_22-26-21',
    'Modularised_GRU_2026-04-14_22-26-21',
    'Modularised_GRU_For_All_Value_Predictors_2026-04-14_22-26-21',
    'Modularised_KNN_2026-04-14_22-26-21',
    'Modularised_KNN_With_Pattern_Matching_2026-04-14_22-26-21',
    'Modularised_KNN_With_Pattern_Matching_Predicting_PRICES_2026-04-14_22-26-21',
]

for name in files:
    path = os.path.join(csv_dir, f"{name}.csv")
    df = pd.read_csv(path, nrows=2)  # just the first 2 rows is enough
    print(f"\n--- {name} ---")
    print("Columns:", df.columns.tolist())
    print(df.head(2))