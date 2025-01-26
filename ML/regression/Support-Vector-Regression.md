### Support Vector Regression (SVR)

#### **What is SVR?**

Support Vector Regression (SVR) is a type of machine learning model used to predict continuous values (like salaries, house prices, or stock prices). It’s part of the Support Vector Machines (SVM) family, which is designed to work for classification and regression tasks.

---

### **Step-by-Step Explanation**

#### 1. **Importing Libraries**

We need some basic Python libraries for data handling, processing, and visualization:

```python
import numpy as np         # For mathematical operations on arrays
import matplotlib.pyplot as plt  # For plotting graphs
import pandas as pd        # For handling datasets
```

#### 2. **Loading the Dataset**

Here we use a dataset called `Position_Salaries.csv`. It contains information about:

-   **Position Level (X):** Represents the job position level.
-   **Salary (y):** Corresponding salary for that position level.

```python
dataset = pd.read_csv('Position_Salaries.csv')  # Load the data
X = dataset.iloc[:, 1:-1].values  # Select Position Levels (independent variable)
y = dataset.iloc[:, -1].values    # Select Salary (dependent variable)
```

Example of data:

```python
print(X)
# Output:
[[ 1]
 [ 2]
 [ 3]
 [ 4]
 [ 5]
 [ 6]
 [ 7]
 [ 8]
 [ 9]
 [10]]

print(y)
# Output:
[  45000   50000   60000   80000  110000  150000  200000  300000  500000
 1000000]
```

#### 3. **Reshaping y**

We reshape `y` into a 2D array because some functions (like scaling) expect a 2D structure:

```python
y = y.reshape(len(y), 1)  # Make it 2D
```

#### 4. **Feature Scaling**

SVR relies on distances between points, so we need to scale the data to ensure fair comparisons:

```python
from sklearn.preprocessing import StandardScaler  # Import the scaler

sc_X = StandardScaler()  # Scaler for X (Position Levels)
sc_y = StandardScaler()  # Scaler for y (Salary)

X = sc_X.fit_transform(X)  # Scale X
y = sc_y.fit_transform(y)  # Scale y
```

Example of scaled data:

```python
print(X)
# Output: Scaled Position Levels
[[-1.5666989 ]
 [-1.21854359]
 [-0.87038828]
 ...
 [ 1.21854359]
 [ 1.5666989 ]]

print(y)
# Output: Scaled Salaries
[[-0.72004253]
 ...
 [ 2.64250325]]
```

#### 5. **Training the SVR Model**

We use the SVR class from sklearn with the RBF kernel (default):

```python
from sklearn.svm import SVR  # Import the SVR class

regressor = SVR(kernel='rbf')  # Use the Radial Basis Function kernel
regressor.fit(X, y)  # Train the model on scaled data
```

#### 6. **Making Predictions**

To predict a new result (e.g., position level 6.5):

1. Scale the input using `sc_X`.
2. Use the `predict` function to get the scaled salary.
3. Inverse transform the result to return to the original scale.

```python
scaled_input = sc_X.transform([[6.5]])  # Scale the input 6.5
scaled_prediction = regressor.predict(scaled_input)  # Predict the scaled output
final_prediction = sc_y.inverse_transform(scaled_prediction.reshape(-1, 1))  # Convert back to original scale

print(final_prediction)
# Output: [[170370.0204065]]  # Predicted salary
```

#### 7. **Visualizing Results**

##### Basic Visualization

We compare the actual data with the predictions:

```python
plt.scatter(sc_X.inverse_transform(X), sc_y.inverse_transform(y), color='red')  # Actual data
plt.plot(sc_X.inverse_transform(X), sc_y.inverse_transform(regressor.predict(X).reshape(-1, 1)), color='blue')  # Predicted
plt.title('Truth or Bluff (SVR)')
plt.xlabel('Position level')
plt.ylabel('Salary')
plt.show()
```

##### Higher Resolution Visualization

For a smoother prediction curve:

```python
X_grid = np.arange(min(sc_X.inverse_transform(X)), max(sc_X.inverse_transform(X)), 0.1)  # High-resolution grid
X_grid = X_grid.reshape((len(X_grid), 1))

plt.scatter(sc_X.inverse_transform(X), sc_y.inverse_transform(y), color='red')  # Actual data
plt.plot(X_grid, sc_y.inverse_transform(regressor.predict(sc_X.transform(X_grid)).reshape(-1, 1)), color='blue')  # Predicted
plt.title('Truth or Bluff (SVR)')
plt.xlabel('Position level')
plt.ylabel('Salary')
plt.show()
```

---

### **Understanding Key Concepts**

#### What are Kernels in SVR?

Kernels transform your data into a higher dimension to make it easier to find patterns. Common kernels:

-   **Linear (kernel='linear'):** Use when data has a straight-line relationship.
-   **Polynomial (kernel='poly'):** Use for polynomial relationships.
-   **RBF (kernel='rbf'):** Use for non-linear and complex relationships (most common).
-   **Sigmoid (kernel='sigmoid'):** Similar to neural networks; less commonly used.

#### How to Choose a Kernel?

-   Use **linear** for simple problems.
-   Use **rbf** for most non-linear datasets.
-   Use **cross-validation** to test which kernel works best for your data.

#### Why Use 6.5 in Predictions?

6.5 is chosen as an example to demonstrate how the model predicts a value within the training range. You can replace 6.5 with any meaningful value (e.g., 7.5 or 8.2) as long as it makes sense for the data.

---

### **Key Points**

1. **Data Drives the Model:**

    - The model learns patterns from the training data, so predictions are reliable only within the data range (1–10 in this case).
    - Predictions outside the range (e.g., 20) are extrapolations and may not be accurate.

2. **Feature Scaling is Necessary:**

    - SVR depends on distances, so scaling ensures inputs are compared on the same scale.

3. **Experiment with Kernels:**

    - Start with **rbf**, but try other kernels (linear, poly) if the results aren’t satisfactory.

4. **Interpolation vs. Extrapolation:**
    - Interpolation (within the training range) is safer and more reliable.
    - Extrapolation (outside the range) is risky because the model hasn’t seen such data.

---

Feel free to experiment by changing the input value in `sc_X.transform([[value]])` or using different kernels in SVR. This will help you understand how the model behaves with different setups!
