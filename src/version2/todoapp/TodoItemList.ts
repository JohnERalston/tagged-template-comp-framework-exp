import { motherShip } from "../app/mothership";
import { html } from "../framework/tag";

export function TodoItemList() {
  const { $a, $f, $h } = motherShip;

  let a = 0;
  setInterval(() => {
    a += 1;
  }, 2000);

  const getContent = (param: number) =>
    html`<div>
      ${motherShip.state.name} is aged ${motherShip.state.age} (${param})

      <div ${$f(["age"], () => String(motherShip.state.age))}>
        ${motherShip.state.age}
      </div>
    </div>`;
  return html`<h1>Yo</h1>
    <div ${$a("age", "data-age")} ${$h("age")}>${motherShip.state.age}</div>
    <button>Inc</button>
    <hr />
    <hr />
    <div ${$f(["age", "name"], () => getContent(a))}>${getContent(a)}</div> `;
}
