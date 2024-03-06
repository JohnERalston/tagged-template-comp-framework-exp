import { Counter } from "../counter";
import { html, mount } from "../framework/tag";
import { TodoItemList } from "./TodoItemList";
// import { TodoItemList } from "./testing_all";
import "./todoapp.css";

mount("#app", html`${TodoItemList()}`);

// mount("#app", html`${Counter()}`);
