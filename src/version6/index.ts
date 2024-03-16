import { $fn, html, mount, redraw } from "./framework";

const api = apiFn();

function apiFn() {
  let count = 0;

  document.addEventListener("click", incCount);

  return {
    incCount,
    getCount,
  };

  function getCount() {
    return `Count is ${count}`;
  }

  function incCount() {
    count += 1;
    redraw(getCount);
  }
}

function Counter() {
  return html`<div>
    <button>Inc count</button>
    <div ${$fn(api.getCount)}>${api.getCount()}</div>
  </div>`;
}

mount("#app", html`${Counter()}`);
