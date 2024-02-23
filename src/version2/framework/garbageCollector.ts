// the string is the uid oa=uid
// the function is the stateful specific unobserve

import { whenRemoving } from "./mutationObserver";

type unobserveFn = () => void;
export const $Map = new Map<string, unobserveFn>();

const removing = (uid: string) => {
  const unobserve = $Map.get(uid);
  if (unobserve) {
    unobserve();
  }
};

whenRemoving(removing);
