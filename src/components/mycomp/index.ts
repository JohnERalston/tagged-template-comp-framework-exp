import { motherShip } from "../../app/motherShip";
import { html, bind, eid, ge } from "../../framework/tag";
import { Dater } from "../dater";

export function MyComp() {
  bind(init);
  const btnId = eid();
  const spanId = eid();
  const { state, observe } = motherShip;

  function inc() {
    state.count += 1;
  }

  function update() {
    ge(spanId).innerHTML = state.count + "";
  }

  function init() {
    ge(btnId).addEventListener("click", inc);
    observe(["count"], update);
  }

  return html`<div class="card">
    <h4>Count</h4>
    <div>Sup <span ${spanId}>${state.count}</span> Man!</div>
    <button ${btnId}>Increment</button>
    <div>
      <h4>Embedded Dater</h4>
      ${Dater()}
    </div>
  </div>`;
}
