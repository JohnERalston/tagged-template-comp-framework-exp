import { __createStore } from "./store";
import { attrObs, fnObs, innerHtmlObs } from "./attrs";
import { $Map } from "./garbageCollector";

interface Stateful<T> {
  state: T;
  observe: (keys: (keyof T)[], fn: Function) => void;
  unObserve: (fn: Function) => void;
  $h: (key: keyof T) => string;
  $a: (key: keyof T, attributeName: string) => string;
  $f: (fn: () => string) => string;
}

let reactiveFunctionAtHand = () => {};

const extractUid = (uid: string) => {
  return uid.split("=")[1].replaceAll('"', "");
};

const euid = () => `a${crypto.randomUUID()}`;
export const obsAttr = (): string => `${attrObs}="${euid()}"`;
export const obsInnerHtml = (): string => `${innerHtmlObs}="${euid()}"`;
export const obsFn = (): string => `${fnObs}="${euid()}"`;
export const gObsAttr = <ElemType extends HTMLElement>(eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[${attrObs}=${id}]`)!;
};
export const gObsIHtml = <ElemType extends HTMLElement>(eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[${innerHtmlObs}=${id}]`)!;
};
export const gObsFn = <ElemType extends HTMLElement>(eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[${fnObs}=${id}]`)!;
};

export function stateful<T extends object>(state: T): Stateful<T> {
  const { setUpdated, register, unregister } = __createStore();
  const observe = (keys: (keyof T)[], fn: Function) =>
    register(
      fn,
      keys.map((key) => String(key))
    );
  return {
    state: new Proxy<T>(state, {
      set(target: any, property: string, newValue: any) {
        target[property] = newValue;
        setUpdated([property]);
        return true;
      },
      get(target: any, property: string) {
        register(reactiveFunctionAtHand, [property]);
        return target[property];
      },
    }),
    observe,
    unObserve: unregister,
    $h: (key: keyof typeof state) => {
      const qId = obsInnerHtml();
      const fn = () => {
        const elem = gObsIHtml(qId);
        elem.innerHTML = String(state[key]);
      };
      observe([key], fn);
      $Map.set(extractUid(qId), () => unregister(fn));
      return qId;
    },
    $a: (key: keyof typeof state, attributeName: string) => {
      const qId = obsAttr();
      const fn = () => {
        const elem = gObsAttr(qId);
        elem.setAttribute(attributeName, String(state[key]));
      };
      observe([key], fn);
      $Map.set(extractUid(qId), () => unregister(fn));
      return `${qId} ${attributeName}=${state[key]}`;
    },
    $f: (setter: () => string) => {
      const qId = obsFn();
      const fn = () => {
        const elem = gObsFn(qId);
        if (!elem) return;
        elem.innerHTML = setter();
      };
      //run it to register deps
      reactiveFunctionAtHand = fn;
      setter();
      // observe(keys, fn);
      $Map.set(extractUid(qId), () => unregister(fn));
      return qId;
    },
  };
}
