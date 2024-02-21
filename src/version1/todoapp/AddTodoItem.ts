import { cid, eid, ge, html, newBind } from "../framework/tag";
import { todoApi } from "./todoMothership";

export function AddTodoItem() {
  const qComp = cid();
  newBind({ cid: qComp, onAdded, onRemoved: () => {} });
  const qIp = eid();
  const qBtn = eid();
  let btn = document.createElement("button");

  function addTodo() {
    todoApi.addTodo(ge<HTMLInputElement>(qIp).value);
  }

  function onAdded() {
    btn = ge(qBtn);
    btn.addEventListener("click", addTodo);
  }

  return html`<div ${qComp}>
    <input ${qIp} /> <button ${qBtn}>Add item</button>
  </div>`;
}
