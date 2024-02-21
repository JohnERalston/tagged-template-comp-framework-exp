import { cid, eid, ge, html, newBind } from "../framework/tag";
import { ITodoItem, todoApi } from "./todoMothership";

export function TodoItemRead(todoItem: ITodoItem) {
  const qComp = cid();
  newBind({ cid: qComp, onAdded, onRemoved: () => {} });
  const qEditBtn = eid();
  const qDelBtn = eid();

  function initEdit() {
    todoItem.renaming = true;
  }

  function initDel() {
    todoApi.removeTodo(todoItem.id);
  }

  function onAdded() {
    ge(qEditBtn).addEventListener("click", initEdit);
    ge(qDelBtn).addEventListener("click", initDel);
  }

  return html`
    <div ${qComp} class="todo-item">
      <div class="todo-name">${todoItem.name}</div>
      <button ${qEditBtn}>Edit</button>
      <button ${qDelBtn}>X</button>
    </div>
  `;
}
