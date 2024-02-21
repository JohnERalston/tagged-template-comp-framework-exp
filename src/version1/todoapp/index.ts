import { html, mount } from "../framework/tag";
import { TodoItemList } from "./TodoItemList";
import "./todoapp.css";

mount("#app", html`${TodoItemList()}`);
