// the string is the uid oa=uid
// the function is the stateful specific unobserve

import { whenRemoving } from "./mutationObserver";
import { Reactive } from "./types";

export const $uidUnobserveFnMap = new Map<string, Reactive>();

const removing = (uid: string) => {
  const reactive = $uidUnobserveFnMap.get(uid);
  if (reactive?.unobserveFn) {
    reactive.unobserveFn();
  }
};

whenRemoving(removing);
