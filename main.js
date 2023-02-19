window.addEventListener("load", () => {

    const form = document.querySelector(".todo-form");
    const todoList = document.querySelector(".todo-list");
    const todos = JSON.parse(localStorage.getItem("todoList")) || [];


    if (Array.isArray(todos) && todos.length > 0) {
        [...todos].forEach(item => createTodoItem(item));
    }

    function createTodoItem(title) {
        const template = `<div class="todo-item">
        <span class="todo-text">${title}</span>
        <i class="fa fa-trash todo-remove" data-value="${title}"></i>
      </div>`;

      todoList.insertAdjacentHTML("beforeend", template);
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const todoVal = this.elements["todo"].value;
        createTodoItem(todoVal);
        todos.push(todoVal);
        localStorage && localStorage.setItem("todoList", JSON.stringify(todos));

        this.elements["todo"].value = "";
    })

    todoList.addEventListener("click", function(e) {
        if (e.target.matches(".todo-remove")) {
            // remove todo in DOM
            const todo = e.target.parentNode;
            todo.parentNode.removeChild(todo);

            // remove todo in localStorage
            const todoText = e.target.previousElementSibling.textContent;
            console.log(todoText);
            const index = todos.findIndex(item => item === todoText);
            todos.splice(index, 1);
            localStorage.setItem("todoList", JSON.stringify(todos));
        }
    })
});
