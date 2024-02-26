import { stateful } from "../framework/stateful";
import { html } from "../framework/tag";
import { ITodoItem, todoState, $f } from "./todoMothership";

type ObservableTodoItem = ReturnType<typeof stateful<ITodoItem>>;

function AddTodoItem() {
  return html`<div>
    <input id="AddTodoItemIp" />
    <button id="AddTodoItemAddBtn">Add item</button>
  </div>`;
}

function TodoItemRead(todoItem: ObservableTodoItem, i: number) {
  return html`
    <div class="todo-item">
      <div class="todo-name">${todoItem.state.name}</div>
      <button todoReadEdit idx="${i}">Edit Name</button>
      <button todoReadREmove idx="${i}">Remove</button>
    </div>
  `;
}

function TodoItemEdit(todoItem: ObservableTodoItem, i: number) {
  return html`<div class="todo-item">
    <input id="TodoItemEditIp" value="${todoItem.state.name}" />
    <button TodoItemEditRenameBtn idx="${i}">Rename</button>
    <button TodoItemEditCancelBtn idx="${i}">Cancel</button>
  </div>`;
}

function TodoItem(todoItem: ObservableTodoItem, i: number) {
  function onRenaming() {
    if (todoItem.state.renaming) {
      return TodoItemEdit(todoItem, i);
    }
    return TodoItemRead(todoItem, i);
  }

  return html`
    <div class="todo-item" ${todoItem.$f(onRenaming)}>
      ${TodoItemRead(todoItem, i)}
    </div>
  `;
}

export function TodoItemList() {
  function getItems() {
    return todoState.todoItems.map((item, i) => TodoItem(item, i)).join("");
  }

  return html`<div>
    ${AddTodoItem()}
    <div ${$f(getItems)}>${getItems()}</div>
  </div>`;
}
