// import { stateful } from "../framework/stateful";
import { $f } from "../framework/reactiveFns";
import { html } from "../framework/tag";
import { ReactiveTodoItem, toDoListStore } from "./todoMothership";

function AddTodoItem() {
  return html`<div>
    <input id="AddTodoItemIp" />
    <button id="AddTodoItemAddBtn">Add item</button>
  </div>`;
}

function TodoItemRead(todoItem: ReactiveTodoItem, i: number) {
  return html`
    <div class="todo-item">
      <div class="todo-name" ${$f(() => todoItem.useStore().name)}>
        ${todoItem.data().name}
      </div>
      <button todoReadEdit idx="${i}">Edit Name</button>
      <button todoReadREmove idx="${i}">Remove</button>
    </div>
  `;
}

function TodoItemEdit(todoItem: ReactiveTodoItem, i: number) {
  return html`<div class="todo-item">
    <input id="TodoItemEditIp" value="${todoItem.data().name}" />
    <button TodoItemEditRenameBtn idx="${i}">Rename</button>
    <button TodoItemEditCancelBtn idx="${i}">Cancel</button>
  </div>`;
}

function TodoItem(todoItem: ReactiveTodoItem, i: number) {
  function onRenaming() {
    const { renaming } = todoItem.useStore();
    if (renaming) {
      return TodoItemEdit(todoItem, i);
    }
    return TodoItemRead(todoItem, i);
  }

  return html`
    <div class="todo-item" ${$f(onRenaming)}>${TodoItemRead(todoItem, i)}</div>
  `;
}

export function TodoItemList() {
  function getItems() {
    return toDoListStore
      .useStore()
      .todoItems.map((item, i) => TodoItem(item, i))
      .join("");
  }

  return html`<div>
    ${AddTodoItem()}
    <div ${$f(getItems)}>${getItems()}</div>
  </div>`;
}
