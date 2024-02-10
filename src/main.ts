import { CounterApiFn } from "./components/counter/counterApi";
import { Counter } from "./components/counter/counter";
import { bind, tag } from "./tag";

const counterApi1 = CounterApiFn();
const counterApi2 = CounterApiFn();

const Counter1 = bind(counterApi1, Counter);
const Counter2 = bind(counterApi2, Counter);

const appNode = document.getElementById("app");

// const elem1 = document.createElement('div');
// const elem2 = document.createElement('div');

const app = tag`
  <div class="cont" id="counter1">${Counter1}</div>
  <div class="cont" id="counter2">${Counter2}</div>
`;
// app.querySelector("#counter1")?.appendChild(Counter1);
// app.querySelector("#counter2")?.appendChild(Counter2);
appNode?.appendChild(app);
