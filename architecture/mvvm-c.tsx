//* MVVM-C (Model-View-ViewModel-Coordinator)

//? View (Login.tsx):
// Displays the UI and triggers actions via the ViewModel.

const Login = () => {
  const { onSubmit, form } = useLogin(); // ViewModel

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput {...form.getInputProps("email")} />
      <PasswordInput {...form.getInputProps("password")} />
      <Button type="submit">Login</Button>
    </form>
  );
};

//? ViewModel (useLogin):
// - Contains the business logic and prepares data for the View.
// - Coordinates the interaction with the Coordinator.

const useLogin = () => {
  const form = useForm({ ... });

  const onSubmit = async (data: typeof form.values) => {
    await authFacade.login(data); // ViewModel delegates to Model
  };

  return { onSubmit, form };
};

//? Coordinator (loginCoordinator):
// Handles navigation logic (e.g., after login, navigate to the home page).

const loginCoordinator = {
  navigateToHome: () => {
    // Logic to navigate user to home screen
  },
};

// ?Model (authFacade, loginApi):
// Handles data and business logic.

class AuthFacade {
  async login(data: LoginRequestType) {
    const res = await loginApi(data);
    return res;
  }
}

const authFacade = new AuthFacade();
