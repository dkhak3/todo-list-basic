// MVC: Model View Controller
class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todoList")) || [];
  }

  handlerTodoChange(handler) {
    this.todoListChange = handler;
    // handleTodoChange = (todos) => {
    //   this.view.displayTodos(todos);
    // };
  }

  _reload(todos) {
    this.todoListChange(todos);
    localStorage.setItem("todoList", JSON.stringify(todos));
  }

  addTodo(todoText) {
    if (todoText.length > 0) {
      this.todos.push(todoText);
    }

    this._reload(this.todos);
  }

  removeTodo(todoText) {
    const index = this.todos.findIndex((item) => item === todoText);
    this.todos.splice(index, 1);

    this._reload(this.todos);
  }
}

class View {
  constructor() {
    this.body = this.getElement("body");

    this.todo = this.createElement("div", "todo");

    this.form = this.createElement("form", "todo-form");
    this.form.autocomplete = "off";

    this.input = this.createElement("input", "todo-input");
    this.input.type = "text";
    this.input.name = "todo";
    this.input.placeholder = "Enter your task";

    this.submit = this.createElement("button", "todo-submit");
    this.submit.type = "submit";
    this.submit.textContent = "Add";

    this.todoList = this.createElement("div", "todo-list");

    this.body.append(this.todo);
    this.todo.append(this.form, this.todoList);
    this.form.append(this.input, this.submit);
  }

  //    createElement
  createElement(tag, className) {
    const elm = document.createElement(tag);
    if (className) elm.classList.add(className);
    return elm;
  }

  //   getElement
  getElement(selector) {
    const elm = document.querySelector(selector);
    return elm;
  }

  //   _ là prive
  get _todoValue() {
    return this.input.value;
  }

  _resetValue() {
    this.input.value = "";
  }

  //   render
  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    if (todos.length > 0) {
      todos.forEach((todoText) => {
        const todoItem = this.createElement("div", "todo-item");

        const span = this.createElement("span", "todo-text");
        span.textContent = todoText;

        const i = this.createElement("i");
        i.className = "fa fa-trash todo-remove";
        i.setAttribute("data-value", todoText);

        todoItem.append(span, i);

        this.todoList.append(todoItem);
      });
    }
  }

  //   add
  viewAddTodo(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._todoValue) {
        handler(this._todoValue);

        this._resetValue();
      }
    });
  }

  //   remove
  viewRemoveTodo(handler) {
    this.todoList.addEventListener("click", (e) => {
      if (e.target.matches(".todo-remove")) {
        const todo = e.target.parentNode;
        todo.parentNode.removeChild(todo);

        const value = e.target.dataset.value;

        handler(value);
      }
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // this.model.addTodo("Kha");
    // this.view.displayTodos(this.model.todos);
    this.model.handlerTodoChange(this.handlerTodoChange);
    this.view.viewAddTodo(this.handlerAddTodo);
    this.view.viewRemoveTodo(this.handlerRemoveTodo);

    this.handlerTodoChange(this.model.todos);
    console.log(this.model.todos);
  }

  handlerTodoChange = (todos) => {
    this.view.displayTodos(todos);
  };

  handlerAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };

  handlerRemoveTodo = (todoText) => {
    this.model.removeTodo(todoText);
  };
}

const app = new Controller(new Model(), new View());
