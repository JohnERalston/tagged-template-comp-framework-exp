import { motherShip } from "../../app/motherShip";
import { stateful } from "../../framework/stateful";
import { html, bind, eid, ge } from "../../framework/tag";
import { Dater } from "../dater";
interface Props {
  name: string;
}

export function MyComp({ name }: Props) {
  bind(init);
  const btnId = eid();
  const intBtnId = eid();
  const spanId = eid();
  const intSpanId = eid();
  const { state, observe } = motherShip;

  const { state: intState, observe: intObserve } = stateful({ count: 0 });
  const inc2 = () => (intState.count += 1);

  function inc() {
    state.count += 1;
  }

  function update() {
    ge(spanId).innerHTML = state.count + "";
  }

  function onInc2() {
    ge(intSpanId).innerHTML = intState.count + "";
  }

  function init() {
    ge(btnId).addEventListener("click", inc);
    ge(intBtnId).addEventListener("click", inc2);
    observe(["count"], update);
    intObserve(["count"], onInc2);
  }

  return html`<div class="card">
    <h4>${name}</h4>
    <div>Sup <span ${spanId}>${state.count}</span> Man!</div>
    <div>Internal: <span ${intSpanId}>${intState.count}</span></div>
    <button ${intBtnId}>Increment internal</button>
    <button ${btnId}>Increment</button>
    <div>
      <h4>Embedded Dater</h4>
      ${Dater()}
    </div>
  </div>`;
}
