import { bind, eid, ge, html, tempDelayBind } from "../framework/tag";
import { ITodoItem } from "./todoMothership";

export function TodoItemEdit(todoItem: ITodoItem) {
  tempDelayBind(init);
  const qIp = eid();
  const qCommitEdit = eid();
  const qCancelEdit = eid();

  function commitEdit() {
    todoItem.name = ge<HTMLInputElement>(qIp).value;
    todoItem.renaming = false;
  }

  function cancelEdit() {
    todoItem.renaming = false;
  }

  function init() {
    ge(qCommitEdit).addEventListener("click", commitEdit);
    ge(qCancelEdit).addEventListener("click", cancelEdit);
  }

  return html`<div class="todo-item">
    <input ${qIp} value="${todoItem.name}" />
    <button ${qCommitEdit}>Rename</button>
    <button ${qCancelEdit}>Cancel</button>
  </div>`;
}
