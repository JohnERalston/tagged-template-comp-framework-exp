import { extractUid, gObsFn, obsFn } from "./attrs";
import { $uidUnobserveFnMap } from "./garbageCollector";
import { ATTR, reactiveConnectorFn } from "./types";

export function $f(reactiveConnectorFn: reactiveConnectorFn): ATTR {
  const attr = obsFn();
  const id = extractUid(attr);
  const reactiveFn = () => {
    const elem = gObsFn(attr);
    if (!elem) return;
    elem.innerHTML = reactiveConnectorFn(id)();
  };
  $uidUnobserveFnMap.set(id, {
    reactiveKickerFn: reactiveFn,
    unobserveFn: () => {},
  });
  const rFn = reactiveConnectorFn(id);
  $uidUnobserveFnMap.get(id)!.reactiveKickerFn = rFn;
  return attr;
}
