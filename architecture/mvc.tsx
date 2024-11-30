//* 1. View (Login.tsx):
//    Role: Displays the UI (login form with email, password fields) and listens for user interactions (e.g., form submit).
//    Responsibility: Handles visual elements and triggers actions, like form submission.
//* 2. ViewModel (useLogin):
//    Role: Acts as the intermediary between the View and the Model.
//    Responsibility: Manages business logic, such as form validation, loading state, and calls to the Model. It handles form submission logic and updates the View with results (e.g., success or error messages).
//* 3. Model (authFacade, loginApi, logoutApi):
//    Role: Handles data and business operations, typically interacting with external services or APIs.
//    Responsibility: Manages the actual login process by making the API request and returning the results (e.g., access token, user data). This layer does not directly interact with the View or ViewModel but provides data to them.

//? View (Login.tsx):

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

const useLogin = () => {
   const form = useForm({ ... }); // Form validation
 
   const onSubmit = async (data: typeof form.values) => {
     // Handle login logic, call Model (authFacade)
     await authFacade.login(data);
   };
 
   return { onSubmit, form };
 };
 
//?  Model (authFacade, loginApi):

class AuthFacade {
   async login(data: LoginRequestType) {
     const res = await loginApi(data); // API call
     return res;
   }
 }
 