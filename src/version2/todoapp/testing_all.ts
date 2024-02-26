import { motherShip } from "../app/testingMothership";
import { IAttr } from "../framework/attrMap";
import { html } from "../framework/tag";

export function TodoItemList() {
  const { $a, $ag, $f, $h } = motherShip;

  let a = 0;
  setInterval(() => {
    a += 1;
  }, 1000);

  let toggle = true;

  const getAttrGroup = (): IAttr => {
    if (toggle) {
      toggle = !toggle;
      return {
        a: `a1${a} ${motherShip.state.age}`,
        b: `b1${a} ${motherShip.state.age}`,
      };
    } else {
      toggle = !toggle;
      return {
        a: `a1${a} ${motherShip.state.age} aaa`,
        c: `c1${a} ${motherShip.state.age} cccc`,
      };
    }
  };

  const getContent = (param: number) =>
    html`<div>
      ${motherShip.state.name} is aged ${motherShip.state.age} (${param})

      <div ${$f(() => String(motherShip.state.age))}>
        ${motherShip.state.age}
      </div>
    </div>`;
  return html`<h1>Yo</h1>
    <!-- need to remove attr also. $a('attr-name', () => ({present: boolean, value: string})) -->
    <div ${$a("age", "data-age")} ${$h("age")}>${motherShip.state.age}</div>
    <button>Inc</button>
    <hr />
    <hr />
    <div ${$f(() => getContent(a))}>${getContent(a)}</div>
    <hr />
    <hr />
    <div ${$ag(() => getAttrGroup())}>
      ${JSON.stringify(getAttrGroup())} This will not update but the atrs will
    </div> `;
}
