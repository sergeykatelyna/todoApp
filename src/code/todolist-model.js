// This class handles Todo items database.

const uniqid = require('uniqid');

class TodoList {
  #todos = null;

  constructor() {
    const storageTodos = localStorage.getItem('todoItems');
    this.#todos = storageTodos ? JSON.parse(storageTodos) : [];
  }

  getTodos(filter) {
    switch (filter) {
      case 'completed':
        return this.#todos.filter((todo) => todo.isDone);
      case 'uncompleted':
        return this.#todos.filter((todo) => !todo.isDone);
      default:
        return [...this.#todos];
    }
  }

  #setTodos(todos) {
    if (!Array.isArray(todos)) {
      return;
    }
    localStorage.setItem('todoItems', JSON.stringify(todos));
    this.#todos = todos;
  }

  addTodo(text = 'Default value') {
    const newTodo = {
      id: uniqid(),
      text,
      isDone: false,
    };
    const updatedTodos = [...this.getTodos(), newTodo];
    this.#setTodos(updatedTodos);
    return newTodo;
  }

  editTodo(id, text = 'Default value') {
    let editedTodo = null;
    const updatedTodos = this.getTodos().map((todo) => {
      if (todo.id === id) {
        editedTodo = {
          ...todo,
          text,
        };
        return editedTodo;
      }
      return todo;
    });
    this.#setTodos(updatedTodos);
    return editedTodo;
  }

  checkTodo(id) {
    let checkedTodo = null;
    const updatedTodos = this.getTodos().map((todo) => {
      if (todo.id === id) {
        checkedTodo = {
          ...todo,
          isDone: !todo.isDone,
        };
        return checkedTodo;
      }
      return todo;
    });
    this.#setTodos(updatedTodos);
    return checkedTodo;
  }

  removeTodo(id) {
    let removedTodo = null;
    const updatedTodos = this.getTodos().filter((todo) => {
      if (todo.id === id) {
        removedTodo = todo;
        return false;
      }
      return true;
    });
    this.#setTodos(updatedTodos);
    return removedTodo;
  }

  removeAllTodos() {
    const oldTodos = this.getTodos();
    this.#setTodos([]);
    return oldTodos;
  }
}

export default TodoList;
