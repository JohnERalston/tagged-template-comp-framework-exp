import { html, mount } from "../framework";
import { getTodoList } from "./todoMothership";
import "./todoapp.css";

mount("#app", html`${getTodoList()}`);

// mount("#app", html`${Counter()}`);
