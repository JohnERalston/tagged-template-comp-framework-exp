import { getE } from "../../tag";

export function CounterApiFn() {
  const elements = {
    inc: document.createElement("button"),
    dec: document.createElement("button"),
    count: document.createElement("span"),
  };

  type ElementKeys = keyof typeof elements;

  const e: Record<ElementKeys, ElementKeys> = {
    inc: "inc",
    dec: "dec",
    count: "count",
  };

  let count = 0;

  function inc() {
    console.log("inc");
    count += 1;
    elements.count.innerHTML = `${count}`;
  }

  function dec() {
    count -= 1;
    console.log("dec");
    elements.count.textContent = `${count}`;
  }

  function init(element: HTMLElement) {
    elements.inc = getE<HTMLButtonElement>(element, "inc");
    elements.dec = getE<HTMLButtonElement>(element, "dec");
    elements.count = getE<HTMLSpanElement>(element, "count");

    elements.inc.addEventListener("click", inc);
    elements.dec.addEventListener("click", dec);
  }

  return {
    e,
    elements,
    init,
    inc,
    dec,
    count,
  };
}
