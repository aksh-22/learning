# Decision Tree Regression Overview

Decision Tree Regression is a non-linear regression technique where the data is split into different regions based on certain feature values, and constant
predictions are made within each region. It can handle both numerical and categorical data, making it useful for datasets where the relationship between
features and the target is not linear.

---

## Steps in Decision Tree Regression

### 1. Import Libraries:
```python
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
```
- `numpy`: Used for numerical operations and array handling.
- `matplotlib`: For plotting graphs and visualizations.
- `pandas`: For data manipulation and reading datasets (usually in CSV format).

### 2. Importing the Dataset:
```python
dataset = pd.read_csv('Position_Salaries.csv')
X = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, -1].values
```
- `X`: Feature matrix (position levels), extracted from all columns except the first and last.
- `y`: Target variable (salaries), extracted from the last column.

### 3. Training the Decision Tree Regression Model:
```python
from sklearn.tree import DecisionTreeRegressor
regressor = DecisionTreeRegressor(random_state=0)
regressor.fit(X, y)
```
- `DecisionTreeRegressor`: Class from `sklearn` to create a decision tree model.
- `regressor.fit(X, y)`: Trains the model using the position levels (`X`) and salaries (`y`).

### 4. Making Predictions:
```python
regressor.predict([[6.5]])
```
- The model predicts the salary for a given position level (6.5 in this case).
- The model uses its learned rules (from the training data) to predict the salary.

### 5. Visualizing the Results:
```python
X_grid = np.arange(min(X), max(X), 0.01)
X_grid = X_grid.reshape((len(X_grid), 1))
plt.scatter(X, y, color='red')
plt.plot(X_grid, regressor.predict(X_grid), color='blue')
plt.title('Truth or Bluff (Decision Tree Regression)')
plt.xlabel('Position level')
plt.ylabel('Salary')
plt.show()
```
- `X_grid`: A finely spaced set of position levels (with small intervals of 0.01) used for plotting a smoother curve.
- `plt.scatter(X, y, color='red')`: Plots the original dataset as red dots.
- `plt.plot(X_grid, regressor.predict(X_grid), color='blue')`: Plots the model’s predicted values as a blue line.

**Visual Outcome:** The graph shows how the decision tree regression model fits the data, creating a stepwise function due to the nature of decision trees.

---

## Key Concepts

### Piecewise Constant Model:
- Decision trees split the data into distinct regions. In regression, this means that the model predicts constant values within each region (stepwise).
- The finer the intervals used for prediction (`X_grid`), the smoother the regression line looks.

### Prediction for New Values (e.g., 6.5):
- The model can make predictions for new inputs (position levels) that weren't explicitly in the training data.
- In this example, the value `6.5` is between two existing position levels in the data, and the model predicts the salary corresponding to that position level
based on the learned decision tree structure.

### Overfitting in Decision Trees:
- Decision trees can overfit the data if they are too complex (i.e., if the tree grows too deep and captures too many specific patterns from the data).
- Visualizing the regression model using a finer resolution (`X_grid`) helps highlight the effect of overfitting: you might see a jagged, overly complex curve.

---

## Advantages of Decision Tree Regression:
- **Non-linear:** Can model complex relationships between the features and the target variable.
- **Easy to interpret:** The tree structure is easy to visualize and interpret.
- **Works well with non-linear data:** Can handle datasets with non-linear relationships.

## Disadvantages of Decision Tree Regression:
- **Overfitting:** Decision trees are prone to overfitting, especially with a deep tree.
- **Not smooth:** The predictions are piecewise constant, meaning the model creates "steps" in predictions, which might not capture trends as smoothly as other
models (e.g., linear regression).

---

## Common Parameters in `DecisionTreeRegressor`:
- `max_depth`: The maximum depth of the tree. If set to `None`, the tree expands until all leaves are pure or until the number of samples in a leaf is below the
minimum.
- `min_samples_split`: The minimum number of samples required to split an internal node.
- `min_samples_leaf`: The minimum number of samples required to be at a leaf node.
- `random_state`: Ensures reproducibility by setting the random seed for splits.
- `criterion`: The function to measure the quality of a split. For regression, `mse` (mean squared error) is typically used.

---

## In Summary:
- Decision Tree Regression is useful for predicting continuous values where the relationship between the feature and target variable is non-linear.
- The model splits the data into regions based on feature values and predicts constant values within each region.
- While decision trees are interpretable, they can suffer from overfitting, especially if the tree is too deep.
- Visualizing the results helps to understand the model's behavior and its prediction accuracy.