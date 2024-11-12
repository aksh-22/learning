// Logs

const logs = {
  latestLog: null,
  history: [],
};

const proxy = new Proxy(logs, {
  set(target, property, value) {
    const latestRelease = value[value.length - 1];
    const { version } = latestRelease;
    if (version.split(".").length !== 3) {
      return false;
    }
    target[property] = value;
    target.latestLog = latestRelease;
    console.log("set", { target, property, value });
    return true;
  },
  get(target, property) {
    console.log("get", { target, property });
    if (property === "history") {
      return target.history.map(
        ({ version, app }) => `Version ${version} of ${app} released`
      );
    }
    return target[property];
  },
});

export default proxy;

// react side
const [logs, setLogs] = useState(Logs);
const [app, setApp] = useState("");
const [version, setVersion] = useState("");

const onFormSubmit = (e) => {
  e.preventDefault();
  console.log({ version, app });
  Logs.history = [...logs.history, { version, app }];
  setLogs({ ...Logs });
};
