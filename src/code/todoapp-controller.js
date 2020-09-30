// This class handles creation of Todo form and event listeners.

import TodoDom from './tododom-view';

const uniqid = require('uniqid');

class TodoApp extends TodoDom {
  constructor() {
    const todoForm = TodoApp.createTodoForm();
    const todoList = todoForm.querySelector('.todoList');

    super(todoList);

    TodoApp.setEventListeners.call(this, todoForm, todoList);

    document.body.append(todoForm);
  }

  static createTodoForm() {
    const formId = uniqid();

    const formTag = document.createElement('FORM');
    formTag.setAttribute('action', '/');
    formTag.setAttribute('method', 'GET');
    formTag.setAttribute('id', formId);
    formTag.classList.add('todoForm');

    const mainLabel = document.createElement('LABEL');
    mainLabel.setAttribute('for', `${formId}__todoInput`);
    mainLabel.textContent = 'Todo items:';

    const inputSection = document.createElement('DIV');
    inputSection.classList.add('inputElsContainer');
    inputSection.innerHTML = `
      <input type="text" placeholder="Enter a todo item" id="${formId}__todoInput">
      <button type="submit">Add</button>
    `;

    const filterSection = document.createElement('FIELDSET');
    filterSection.classList.add('filtersContainer');
    filterSection.innerHTML = `
      <legend>Todo filters:</legend>
      <input type="radio" name="todoFilter" id="${formId}__filter1" value="all" checked>
      <label for="${formId}__filter1">All</label>
      <input type="radio" name="todoFilter" id="${formId}__filter2" value="completed">
      <label for="${formId}__filter2">Completed</label>
      <input type="radio" name="todoFilter" id="${formId}__filter3" value="uncompleted">
      <label for="${formId}__filter3">Uncompleted</label>
    `;

    const todoContainer = document.createElement('OL');
    todoContainer.classList.add('todoList');

    const resetAllSection = document.createElement('DIV');
    resetAllSection.classList.add('ResetAllContainer');
    resetAllSection.innerHTML = `
      <button type="reset">Clear All</button>
    `;

    formTag.append(
      mainLabel,
      inputSection,
      filterSection,
      todoContainer,
      resetAllSection,
    );

    return formTag;
  }

  static setEventListeners(todoForm, todoList) {
    const todoInput = todoForm.querySelector(`#${todoForm.id}__todoInput`);

    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!todoInput.value) {
        return;
      }
      this.addTodo(todoInput.value);
      todoInput.value = '';
    });

    todoList.addEventListener('click', (e) => {
      if (!e.target.matches('.todoEditBtn')) {
        return;
      }
      const liToEdit = e.target.closest('LI');
      const fieldToEdit = liToEdit.querySelector('SPAN');
      fieldToEdit.contentEditable = true;
      fieldToEdit.style.backgroundColor = '#ffffff';
      fieldToEdit.style.color = '#000000';
      fieldToEdit.focus({
        preventScroll: true,
      });
      fieldToEdit.addEventListener(
        'focusout',
        () => {
          fieldToEdit.contentEditable = false;
          fieldToEdit.style.backgroundColor = '';
          fieldToEdit.style.color = '';
          this.editTodo(liToEdit.id, fieldToEdit.textContent);
        },
        {
          once: true,
        },
      );
    });

    todoForm.addEventListener('change', (e) => {
      if (e.target.matches('[type="radio"]')) {
        const filter = e.target.value;
        this.filterTodo(filter);
      }
      if (e.target.matches('[type="checkbox"]')) {
        const liToCheck = e.target.closest('LI');
        this.checkTodo(liToCheck.id);
      }
    });

    todoList.addEventListener('click', (e) => {
      if (!e.target.matches('.todoRemoveBtn')) {
        return;
      }
      const liToRemove = e.target.closest('LI');
      this.removeTodo(liToRemove.id);
    });

    todoForm.addEventListener('reset', (e) => {
      e.preventDefault();
      this.removeAllTodos();
    });
  }
}

export default TodoApp;
