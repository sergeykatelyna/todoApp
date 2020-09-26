// This class handles Todo items DOM representation.

import TodoList from './todolist-model';

class TodoDom extends TodoList {
  #todoList = null;

  #todoFilter = 'all';

  constructor(todoList) {
    super();

    this.#todoList = todoList;

    this.#renderTodo();
  }

  #createTodoLi(todo) {
    const { id, text, isDone } = todo;

    const todoLi = document.createElement('LI');
    todoLi.id = id;
    todoLi.innerHTML = `
      <input type="checkbox" class="todoCompletedBtn" ${
        isDone ? 'checked' : ''
      }>
      <span>${text}</span>
      <button type="button" class="todoEditBtn">🖊️</button>
      <button type="button" class="todoRemoveBtn">&times;</button>
    `;

    return todoLi;
  }

  #renderTodo() {
    this.#todoList.innerHTML = '';

    const todos = super.getTodos(this.#todoFilter);

    todos.forEach((todo) => {
      const todoLi = this.#createTodoLi(todo);

      this.#todoList.append(todoLi);
    });
  }

  addTodo(text) {
    super.addTodo(text);

    this.#renderTodo();
  }

  editTodo(id, text) {
    super.editTodo(id, text);

    this.#renderTodo();
  }

  checkTodo(id) {
    super.checkTodo(id);

    this.#renderTodo();
  }

  filterTodo(filter) {
    this.#todoFilter = filter;

    this.#renderTodo(filter);
  }

  removeTodo(id) {
    super.removeTodo(id);

    this.#renderTodo();
  }

  removeAllTodos() {
    super.removeAllTodos();

    this.#renderTodo();
  }
}

export default TodoDom;
