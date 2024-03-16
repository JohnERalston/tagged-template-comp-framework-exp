import { $fn, html, on, redraw } from "../framework";

const todoList = {
  items: [getTodo("one"), getTodo("two")],
};
function popTodos() {
  return todoList.items.map((item) => item.html).join("<hr />");
}

function AddTodoItem() {
  return html`<div>
    <input id="AddTodoItemIp" />
    <button id="AddTodoItemAddBtn">Add item</button>
  </div>`;
}

function findTodo(key: string) {
  return todoList.items.find((item) => item.key === key)!;
}

function getTodo(name: string) {
  let editable = false;
  let liveName = name;
  let key = crypto.randomUUID();

  function setEditable(b: boolean) {
    editable = b;
  }

  function render() {
    return editable ? getTodoEdit(liveName, key) : getTodoRead(liveName, key);
  }

  function update(name: string) {
    liveName = name;
    editable = false;
  }

  return {
    html: html`<div ${$fn(render)}>${render()}</div>`,
    setEditable,
    render,
    update,
    key,
  };
}

function getTodoRead(name: string, key: string): string {
  return html`
    <div class="todo-item">
      <div class="todo-name">${name}</div>
      <button ${on("click", () => setEditable(key))} idx="${key}">
        Edit Name
      </button>
      <button todoReadREmove idx="${key}">Remove</button>
    </div>
  `;
}

function getTodoEdit(name: string, key: string): string {
  return html`<div class="todo-item">
    <input id="TodoItemEditIp" value="${name}" />
    <button TodoItemEditRenameBtn idx="${key}">Rename</button>
    <button TodoItemEditCancelBtn idx="${key}">Cancel</button>
  </div>`;
}

function addTodo(name: string) {
  todoList.items.push(getTodo(name));
  redraw(popTodos);
}

function removeTodo(key: string) {
  todoList.items = todoList.items.filter((elem) => elem.key !== key);
}

function setEditable(key: string) {
  const todo = findTodo(key);
  todo.setEditable(true);
  redraw(todo.render);
}

export function getTodoList() {
  return html`
    <div>${AddTodoItem()}</div>
    <div ${$fn(popTodos)}>${popTodos()}</div>
  `;
}

// handlers
// plenty room for improvement here
// such as $on("click", (e: Event) = {})
document.addEventListener("click", (event: any) => {
  const elem = event.target as HTMLElement;
  const id = elem.getAttribute("id");
  const index = elem.getAttribute("idx")!;
  const todo = findTodo(index);
  if (id === "AddTodoItemAddBtn") {
    const elem = document.getElementById("AddTodoItemIp") as HTMLInputElement;
    addTodo(elem.value);
  }
  // else if (elem.hasAttribute("todoReadEdit")) {
  // todo.setEditable(true);
  // redraw(todo.render);
  // }
  else if (elem.hasAttribute("todoReadRemove")) {
    removeTodo(index);
    redraw(popTodos);
  } else if (elem.hasAttribute("TodoItemEditRenameBtn")) {
    const elem = document.getElementById("TodoItemEditIp") as HTMLInputElement;
    todo.update(elem.value);
    redraw(findTodo(index).render);
  } else if (elem.hasAttribute("TodoItemEditCancelBtn")) {
    todo.setEditable(false);
    redraw(todo.render);
  }
});
