//* MVP (Model-View-Presenter)

//? View (Login.tsx):
// Displays UI elements and communicates with the Presenter.
// No business logic here.

const Login = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextInput />
      <PasswordInput />
      <Button type="submit">Login</Button>
    </form>
  );
};

//? Presenter (useLogin):
// Contains the business logic and validation.
// Delegates the API calls to the Model and updates the View.

const useLogin = () => {
    const form = useForm({ ... });
  
    const onSubmit = async (data: typeof form.values) => {
      await authFacade.login(data); // Communicates with the Model
    };
  
    return { onSubmit, form };
  };
  

//? Model (authFacade, loginApi):
// Manages the data and API interactions.

class AuthFacade {
    async login(data: LoginRequestType) {
      const res = await loginApi(data);
      return res;
    }
  }
  
  const authFacade = new AuthFacade();
  