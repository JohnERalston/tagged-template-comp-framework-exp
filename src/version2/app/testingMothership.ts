import { stateful } from "../framework/stateful";

export const motherShip = stateful({ name: "john", age: 43 });

document.addEventListener("click", () => {
  motherShip.state.age += 1;
});
