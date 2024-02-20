import { bind, eid, ge, html } from "../framework/tag";
import { AddTodoItem } from "./AddTodoItem";
import { TodoItem } from "./TodoItem";
import { observeTodo, todoState } from "./todoMothership";

export function TodoItemList() {
  // bind(init);
  const qCont = eid();
  observeTodo(["todoItems"], () => {
    ge(qCont).innerHTML = getItems();
  });

  function getItems() {
    return todoState.todoItems.map((item) => TodoItem(item)).join("");
  }

  // function init() {    }

  return html`${AddTodoItem()}
    <div ${qCont}>${getItems()}</div>`;
}
