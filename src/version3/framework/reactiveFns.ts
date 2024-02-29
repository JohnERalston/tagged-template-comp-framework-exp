import { extractUid, gObsFn, obsFn } from "./attrs";
import { $uidUnobserveFnMap } from "./garbageCollector";
import { rFunctionTracker } from "./reactiveFunctionTracker";
import { ATTR, reactiveFn } from "./types";

export function $f(fn: reactiveFn): ATTR {
  const attr = obsFn();
  const id = extractUid(attr);
  const rFn = () => {
    const elem = gObsFn(attr);
    if (!elem) return;
    rFunctionTracker.setCurrentRFn(id);
    elem.innerHTML = fn();
    rFunctionTracker.restorePrevRFn();
  };
  $uidUnobserveFnMap.set(id, {
    reactiveKickerFn: rFn,
    unobserveFn: () => {},
  });
  rFunctionTracker.setCurrentRFn(id);
  fn();
  rFunctionTracker.restorePrevRFn();
  return attr;
}
