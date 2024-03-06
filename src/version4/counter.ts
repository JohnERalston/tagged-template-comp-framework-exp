import { r, v } from "./framework";
import { renderEngine } from "./framework/renderEngine";
import { html } from "./framework/tag";

const count = {
  value: 0,
};

document.addEventListener("click", () => {
  count.value += 1;
  renderEngine.renderIfChangedAll();
});

export function Counter() {
  console.log("counter");
  return html`<div ${r((id) => `Count ${v(id, count, "value")}`)}>
      Count: ${count.value}
    </div>
    <div>
      <button>Inc</button>
    </div>`;
}
