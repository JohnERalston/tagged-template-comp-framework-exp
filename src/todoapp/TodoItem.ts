import { cid, eid, ge, html, newBind } from "../framework/tag";
import { TodoItemEdit } from "./TodoItemEdit";
import { TodoItemRead } from "./TodoItemRead";
import { ObservableTodoItem } from "./todoMothership";

export function TodoItem({ observe, unObserve, state }: ObservableTodoItem) {
  const qComp = cid();
  const qWrap = eid();
  newBind({ cid: qComp, onAdded, onRemoved });

  function onRenamingChange() {
    const wrap = ge(qWrap);
    if (state.renaming) {
      wrap.innerHTML = TodoItemEdit(state);
    } else {
      wrap.innerHTML = TodoItemRead(state);
    }
  }

  function onAdded() {
    observe(["renaming"], onRenamingChange);
  }
  function onRemoved() {
    unObserve(onRenamingChange);
  }

  return html`<div ${qComp}>
    <div ${qWrap}>${TodoItemRead(state)}</div>
  </div>`;
}
