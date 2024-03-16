import { html, mount } from "../version4/framework/tag";

const fnMap = new Map();

function $fn(fn: () => {}) {
  const id = crypto.randomUUID();
  fnMap.set(id, fn);
  return `fn="${id}"`;
}

function redraw(fn: () => string) {
  const [id] = Array.from(fnMap.entries()).find(([, mapFn]) => mapFn === fn)!;
  const elem = document.querySelector(`[fn="${id}"]`)!;
  elem.innerHTML = fn();
}

function on(type: keyof DocumentEventMap, fn: Function) {
  const id = crypto.randomUUID();
  document.addEventListener(type, (event: Event) => {
    const evt = event.target as HTMLElement;
    if (evt.getAttribute("on") === id) {
      fn(event);
    }
  });
  return `on="${id}"`;
}

export { html, mount, $fn, redraw, on };
