// import { stateful } from "../framework/stateful";

import { r, v } from "../framework";
import { html } from "../framework/tag";
import { ITodoItem, todoList } from "./todoMothership";

function AddTodoItem() {
  return html`<div>
    <input id="AddTodoItemIp" />
    <button id="AddTodoItemAddBtn">Add item</button>
  </div>`;
}

function TodoItemRead(todoItem: ITodoItem, i: number) {
  return html`
    <div class="todo-item">
      <div class="todo-name" ${r((id) => v(id, todoItem, "name"))}>
        ${todoItem.name}
      </div>
      <button todoReadEdit idx="${i}">Edit Name</button>
      <button todoReadREmove idx="${i}">Remove</button>
    </div>
  `;
}

function TodoItemEdit(todoItem: ITodoItem, i: number) {
  return html`<div class="todo-item">
    <input id="TodoItemEditIp" value="${todoItem.name}" />
    <button TodoItemEditRenameBtn idx="${i}">Rename</button>
    <button TodoItemEditCancelBtn idx="${i}">Cancel</button>
  </div>`;
}

function TodoItem(todoItem: ITodoItem, i: number) {
  function onRenaming(id: string) {
    const renaming = v(id, todoItem, "renaming");
    console.log({ renaming });
    if (renaming) {
      return TodoItemEdit(todoItem, i);
    }
    return TodoItemRead(todoItem, i);
  }

  return html`
    <div class="todo-item" ${r(onRenaming)}>${TodoItemRead(todoItem, i)}</div>
  `;
}

export function TodoItemList() {
  function getItems(items: ITodoItem[]) {
    return items.map((item, i) => TodoItem(item, i)).join("");
  }

  function getReactiveItems(id: string) {
    const items = v(id, todoList, "items");
    return getItems(items);
  }

  return html`<div>
    ${AddTodoItem()}
    <div ${r(getReactiveItems)}>${getItems(todoList.items)}</div>
  </div>`;
}
