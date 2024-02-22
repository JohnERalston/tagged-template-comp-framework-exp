import { stateful } from "../framework/stateful";
import {
  gObsAttr,
  gObsFn,
  gObsIHtml,
  obsAttr,
  obsFn,
  obsInnerHtml,
} from "../framework/tag";

export const motherShip = stateful({ name: "john", age: 43 });

document.addEventListener("click", () => {
  motherShip.state.age += 1;
});

// export const motherShipKeys = Object.keys(motherShip.state);

// const obsAttrsMap: Record<string, () => void> = {};

export const $a = (
  key: keyof typeof motherShip.state,
  attributeName: string
) => {
  const qId = obsAttr();
  motherShip.observe([key], () => {
    const elem = gObsAttr(qId);
    elem.setAttribute(attributeName, String(motherShip.state[key]));
  });
  return `${qId} ${attributeName}=${motherShip.state[key]}`;
};

export const $h = (key: keyof typeof motherShip.state) => {
  const qId = obsInnerHtml();
  motherShip.observe([key], () => {
    const elem = gObsIHtml(qId);
    elem.innerHTML = String(motherShip.state[key]);
  });
  return qId;
};

export const $f = (
  keys: (keyof typeof motherShip.state)[],
  fn: () => string
) => {
  const qId = obsFn();
  motherShip.observe(keys, () => {
    const elem = gObsFn(qId);
    elem.innerHTML = fn();
  });
  return qId;
};
