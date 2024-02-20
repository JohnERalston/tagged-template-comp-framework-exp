import { eid, ge, html, tempDelayBind } from "../framework/tag";
import { ITodoItem, todoApi } from "./todoMothership";

export function TodoItemRead(todoItem: ITodoItem) {
  tempDelayBind(init);
  const qEditBtn = eid();
  const qDelBtn = eid();

  function initEdit() {
    todoItem.renaming = true;
  }

  function initDel() {
    todoApi.removeTodo(todoItem.id);
  }

  function init() {
    ge(qEditBtn).addEventListener("click", initEdit);
    ge(qDelBtn).addEventListener("click", initDel);
  }

  return html`
    <div class="todo-item">
      <div class="todo-name">${todoItem.name}</div>
      <button ${qEditBtn}>Edit</button>
      <button ${qDelBtn}>X</button>
    </div>
  `;
}
