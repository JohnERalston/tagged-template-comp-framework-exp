import { html, mount } from "../version6/framework";
import {
  appendToSlot,
  getSlotFromKey,
  getValue,
  getValueElem,
  makeSlot,
  makeValuable,
  on,
  removeSlot,
  replaceSlot,
} from "./framework";

interface ITodo {
  id: string;
  name: string;
  done: boolean;
}

const todoApiData = [
  { id: "0", name: "one", done: false },
  { id: "1", name: "two", done: false },
  { id: "2", name: "three", done: false },
];

const todoListSlot = makeSlot();

function setToDo1Editable() {
  const slot = getSlotFromKey(`todoItem${todoApiData[1].id}`);
  replaceSlot(slot, TodoItemEdit(todoApiData[1]));
}

function addTodo(nameElem: HTMLInputElement) {
  const todo: ITodo = {
    id: crypto.randomUUID(),
    name: nameElem.value,
    done: false,
  };
  appendToSlot(todoListSlot, TodoItem(todo));
  nameElem.value = "";
}

function rename(slot: string, name: string, todo: ITodo) {
  todo.name = name; //api save
  replaceSlot(slot, TodoItem(todo));
}

function TodoItem(todo: ITodo): string {
  const todoSlot = makeSlot(`todoItem${todo.id}`);

  return html`
    <div class="todo-item" ${todoSlot}>
      <div class="todo-name">${todo.name}</div>
      <button ${on("click", () => replaceSlot(todoSlot, TodoItemEdit(todo)))}>
        Edit Name
      </button>
      <button ${on("click", () => removeSlot(todoSlot))}>Remove</button>
    </div>
  `;
}

function TodoItemEdit(todoItem: ITodo) {
  const todoSlot = makeSlot();
  const nameValue = makeValuable();

  return html`<div class="todo-item" ${todoSlot}>
    <input ${nameValue} value="${todoItem.name}" />
    <button
      ${on("click", () => rename(todoSlot, getValue(nameValue), todoItem))}
    >
      Rename
    </button>
    <button ${on("click", () => replaceSlot(todoSlot, TodoItem(todoItem)))}>
      Cancel
    </button>
  </div>`;
}

function TodoList(data: ITodo[]) {
  return data.map((todo) => TodoItem(todo));
}

function AddTodoItem() {
  const nameValue = makeValuable();

  return html`<div>
    <input ${nameValue} />
    <button ${on("click", () => addTodo(getValueElem(nameValue)))}>
      Add item
    </button>
  </div>`;
}

const todoList = html`${AddTodoItem()}
  <div ${todoListSlot}>${TodoList(todoApiData).join("")}</div>`;

function setTodo1Editable() {
  return html`<button ${on("click", setToDo1Editable)}>
    setToDo1Editable
  </button>`;
}

mount(
  "#app",
  html`${todoList}
    <hr />
    ${setTodo1Editable()}`
);
