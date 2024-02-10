import { CounterApiFn } from "./counterApi";

const john = "John";

export const Counter = ({ e, count }: ReturnType<typeof CounterApiFn>) => `
    <h1>Counter</h1>
    <div>${john}</div>
    <h4>Count: <span e="${e.count}">${count}</span></h4>
    <button e="${e.dec}">Dec</button>
    <button e="${e.inc}">Inc</button>
`;
