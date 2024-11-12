class Observer {
  observers: any[];
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((f) => f !== func);
  }

  notify(value: boolean) {
    this.observers.forEach((observer) => {
      observer(value);
    });
  }
}

const LoginObserver = new Observer();

export default LoginObserver;

// In JSX

const [loggedIn, setLoggedIn] = useState(false);

const onChange = (val: boolean) => {
  setLoggedIn(val);
};

useEffect(() => {
  LoginObserver.subscribe(onChange);
  () => {
    LoginObserver.unsubscribe(onChange);
  };
}, [LoginObserver]);

const onButtonClick = () => {
  LoginObserver.notify(true);
};
