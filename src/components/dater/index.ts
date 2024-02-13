import { motherShip } from "../../app/motherShip";
import { html, bind, eid, ge } from "../../framework/tag";

export function Dater() {
  bind(init);
  const btnId = eid();
  const spanId = eid();
  const { state, observe } = motherShip;

  function change() {
    state.dateStr = new Date().toISOString();
  }

  function update() {
    ge(spanId).innerHTML = state.dateStr;
  }

  function init() {
    ge(btnId).addEventListener("click", change);
    observe(["dateStr"], update);
  }

  return html`<div class="card">
    <h4>Dater...</h4>
    <div>Sup <span ${spanId}>${state.dateStr}</span> Man!</div>
    <button ${btnId}>Set Date</button>
    <h4>Embedded MyComp</h4>
  </div>`;
}
