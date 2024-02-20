import { eid, ge, html, tempDelayBind } from "../framework/tag";
import { TodoItemEdit } from "./TodoItemEdit";
import { TodoItemRead } from "./TodoItemRead";
import { ObservableTodoItem } from "./todoMothership";

export function TodoItem({ observe, unObserve, state }: ObservableTodoItem) {
  tempDelayBind(init);
  const qCont = eid();

  function onRenamingChange() {
    const wrap = ge(qCont);
    if (state.renaming) {
      wrap.innerHTML = TodoItemEdit(state);
    } else {
      wrap.innerHTML = TodoItemRead(state);
    }
  }

  function init() {
    const wrap = ge(qCont);
    observe(["renaming"], onRenamingChange);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "childList" &&
          Array.from(mutation.removedNodes).includes(wrap)
        ) {
          // Element was removed, do something here
          unObserve(onRenamingChange);
        }
      });
    });
    observer.observe(wrap.parentNode, { childList: true });
  }

  return html` <div ${qCont}>${TodoItemRead(state)}</div> `;
}
