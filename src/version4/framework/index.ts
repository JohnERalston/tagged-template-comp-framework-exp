import { extractUid, gObsFn, obsAttr, obsFn } from "./attrs";
import { renderEngine } from "./renderEngine";
import { ReactiveFnProps } from "./types";

export function r(fn: ReactiveFnProps) {
  const attr = obsFn();
  const uid = extractUid(attr);
  const rFn = () => {
    const elem = gObsFn(attr);
    if (!elem) return;
    elem.innerHTML = fn(uid);
  };
  renderEngine.setReactiveFn(uid, rFn);
  fn(uid);
  return attr;
}

export const v = renderEngine.setThenGetValue;
