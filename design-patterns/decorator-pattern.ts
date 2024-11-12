// The decorator pattern is useful for abstracting and reusing functionality
// Decorators are particularly useful in the following real-life scenarios:

// Logging: Adding logging logic to methods without cluttering business logic.
// Validation: Validating method inputs in a reusable way across multiple methods.
// Caching: Caching expensive function calls, reducing unnecessary computation.
// Authorization: Enforcing role-based access control in a centralized and reusable way.
// Transaction Management: Ensuring multiple operations execute as part of a single transaction.

function validateArgs(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const [data] = args; // Extract the first argument (data) passed to the method

    // Simple validation: ensure the data contains both email and password
    if (!data.email || !data.password) {
      throw new Error("Email and password are required!");
    }

    // Call the original method if validation passes
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Test {
  @validateArgs
  async login(data: LoginRequestType, dispatch: any) {
    const res = await loginApi(data);
    dispatch(updateToken(res.data.access_token));
    dispatch(updateUserData(res.data.user));
    success({ message: "Successfully logged in!" });
  }
}
