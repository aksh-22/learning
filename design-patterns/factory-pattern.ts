// !---------Object way

const todo: any[] = [];
let instance: null | any = null;

// ?functional way
const createTodo = (todoText: string) => {
  const id = Date.now();
  return {
    text: todoText,
    id,
    deleteSelf() {
      const index = todo.findIndex((item) => item.id === id);
      todo.splice(index, 1);
    },
  };
};

// ? Class way ( Efficient way )

class Todo {
  id: number;
  text: string;
  constructor(todoText: string) {
    this.id = Date.now();
    this.text = todoText;
  }
  deleteSelf() {
    const index = todo.findIndex((item) => item.id === this.id);
    todo.splice(index, 1);
  }
}

export const TodoStore = {
  getInstance() {
    return instance;
  },

  getTodo() {
    return todo;
  },

  setTodo(task: any) {
    // todo.push(createTodo(task));
    todo.push(new Todo(task));
  },
};

Object.freeze(TodoStore);
