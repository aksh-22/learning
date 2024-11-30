//* MVVM (Model-View-ViewModel)

//? View (Login.tsx):
// Displays the form and binds data to ViewModel.
// Triggers actions, like form submission.

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
// Contains business logic, form validation, and communicates with the Model.

const useLogin = () => {
    const form = useForm({ ... });
  
    const onSubmit = async (data: typeof form.values) => {
      await authFacade.login(data); // Communicates with Model
    };
  
    return { onSubmit, form };
  };
  
//?   Model (authFacade, loginApi):
//   Handles the data and API interaction.

class AuthFacade {
    async login(data: LoginRequestType) {
      const res = await loginApi(data);
      return res;
    }
  }
  
  const authFacade = new AuthFacade();
  