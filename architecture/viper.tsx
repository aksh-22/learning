//* VIPER (View-Interactor-Presenter-Entity-Router)

//? View (Login.tsx):
// Displays the UI and communicates with the Presenter.

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
// Contains the logic to manage user interaction, form validation, and delegates tasks to the Interactor.

const useLogin = () => {
    const form = useForm({ ... });
  
    const onSubmit = async (data: typeof form.values) => {
      await authInteractor.login(data); // Delegate task to Interactor
    };
  
    return { onSubmit, form };
  };
  
//? Interactor (authInteractor):
// Contains the core business logic and interacts with Entities and Model.

class AuthInteractor {
    async login(data: LoginRequestType) {
      const res = await loginApi(data);
      return res;
    }
  }
  
  const authInteractor = new AuthInteractor();


//? Entity (User, AuthData):
// Represents the data structure.

class User {
    email: string;
    token: string;
  }
  
  class AuthData {
    user: User;
    token: string;
  }
  
//? Router (loginRouter):
// Handles navigation, directing to the next screen after login.

const loginRouter = {
    navigateToHome: () => {
      // Navigation logic
    },
  };
  