import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.manifold import TSNE
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import pickle

import warnings
warnings.filterwarnings('ignore')


df = pd.read_csv("./playlist_features.csv", index_col=0)
# print(df.info())

# Extract the year from 'Release_Date'
df['Release_Year'] = pd.to_datetime(df['Release_Date']).dt.year

# Add a 'mood' column based on valence values


def label_mood(row):
    if row['Valence'] >= 0.6:
        return 'happy'
    elif row['Valence'] <= 0.39:
        return 'sad'
    else:
        return 'neutral'


df['Mood'] = df.apply(lambda row: label_mood(row), axis=1)

# Categorize songs by release year


def categorize_release_year(year):
    if year >= 2023:
        return 'latest'
    elif 2010 <= year <= 2022:
        return 'mid'
    else:
        return 'old'


df['Release_Era'] = df['Release_Year'].apply(categorize_release_year)

# Feature and target matrices

X = df[['Valence', 'Danceability', 'Energy',
        'Release_Year', 'Acousticness', 'Loudness', 'Tempo']]
# X = df[['Valence', 'Danceability', 'Energy', 'Release_Year']]  # Add more features as needed
# Predicting both mood and era simultaneously might require a multi-output model
y = df[['Mood', 'Release_Era']]


# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


# Initialize the base classifier
base_rf = RandomForestClassifier(n_estimators=100, random_state=42)

# Create the multi-output classifier
multi_target_rf = MultiOutputClassifier(base_rf, n_jobs=-1)

# Fit the model
multi_target_rf.fit(X_train_scaled, y_train)

# Predictions
predictions = multi_target_rf.predict(X_test_scaled)


def recommend_songs_for_user_preferences(model, df, scaler, user_mood, user_era, num_recommendations):

    # Scale the features of the entire dataset as we did for the training data
    features = df[['Valence', 'Danceability', 'Energy',
                   'Release_Year', 'Acousticness', 'Loudness', 'Tempo']]
    scaled_features = scaler.transform(features)

    # Make predictions for the entire dataset
    predictions = model.predict(scaled_features)

    # Convert predictions to a DataFrame for easier handling
    predictions_df = pd.DataFrame(
        predictions, columns=['Mood', 'Release_Era'], index=df.index)

    # Add predictions back to the original dataset to filter
    df_with_predictions = df.assign(
        Predicted_Mood=predictions_df['Mood'], Predicted_Era=predictions_df['Release_Era'])

    # Filter based on user preferences
    filtered_songs = df_with_predictions[
        (df_with_predictions['Predicted_Mood'] == user_mood) &
        (df_with_predictions['Predicted_Era'] == user_era)
    ].sort_values(by=['Popularity'], ascending=False).head(num_recommendations)

    return filtered_songs[['Track_id']]


print(recommend_songs_for_user_preferences(
    multi_target_rf, df, 'happy', 'mid', 10))
