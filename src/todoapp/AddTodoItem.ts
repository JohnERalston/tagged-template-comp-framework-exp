import { bind, eid, ge, html } from "../framework/tag";
import { todoApi } from "./todoMothership";

export function AddTodoItem() {
  bind(init);
  const qIp = eid();
  const qBtn = eid();

  function init() {
    ge(qBtn).addEventListener("click", () => {
      todoApi.addTodo(ge<HTMLInputElement>(qIp).value);
    });
  }

  return html`<div><input ${qIp} /> <button ${qBtn}>Add item</button></div>`;
}
