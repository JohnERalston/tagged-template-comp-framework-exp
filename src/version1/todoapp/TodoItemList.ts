import { cid, eid, ge, html, newBind } from "../framework/tag";
import { AddTodoItem } from "./AddTodoItem";
import { TodoItem } from "./TodoItem";
import { observeTodo, unobserveTodo, todoState } from "./todoMothership";

export function TodoItemList() {
  const qComp = cid();
  newBind({ cid: qComp, onAdded, onRemoved });
  const qItems = eid();

  function setItems() {
    ge(qItems).innerHTML = getItems();
  }

  function onAdded() {
    observeTodo(["todoItems"], setItems);
  }

  function onRemoved() {
    unobserveTodo(setItems);
  }

  function getItems() {
    return todoState.todoItems.map((item) => TodoItem(item)).join("");
  }

  return html`<div ${qComp}>
    ${AddTodoItem()}
    <div ${qItems}>${getItems()}</div>
  </div>`;
}
