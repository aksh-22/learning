// !---------Class way

const todo1: any[] = [];
let instance1: null | any = null;

class Todo {
  constructor() {
    if (instance1 !== null) {
      throw new Error("You can have one instance1 at a time.");
    }
    instance1 = this;
  }

  getInstance() {
    return instance1;
  }

  getTodo() {
    return todo1;
  }

  setTodo(task: any) {
    todo1.push(task);
  }
}

const todoInstance = new Todo();
Object.freeze(todoInstance);

export default todoInstance;

// state
const [first, setFirst] = useState(new Todo().getTodo());

// !---------Object way

const todo: any[] = [];
let instance: null | any = null;

export const TodoStore = {
  getInstance() {
    return instance;
  },

  getTodo() {
    return todo;
  },

  setTodo(task: any) {
    todo.push(task);
  },
};

Object.freeze(TodoStore);
