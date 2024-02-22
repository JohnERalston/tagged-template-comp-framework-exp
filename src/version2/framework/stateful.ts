import { __createStore } from "./store";
import { attrObs, iFnObs, iHtmlObs } from "./attrs";

interface Stateful<T> {
  state: T;
  observe: (keys: (keyof T)[], fn: Function) => void;
  unObserve: (fn: Function) => void;
  $h: (key: keyof T) => string;
  $a: (key: keyof T, attributeName: string) => string;
  $f: (keys: (keyof T)[], fn: () => string) => string;
}

const euid = () => `a${crypto.randomUUID()}`;
export const obsAttr = (): string => `${attrObs}="${euid()}"`;
export const obsInnerHtml = (): string => `${iHtmlObs}="${euid()}"`;
export const obsFn = (): string => `${iFnObs}="${euid()}"`;
export const gObsAttr = <ElemType extends HTMLElement>(eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[${attrObs}=${id}]`)!;
};
export const gObsIHtml = <ElemType extends HTMLElement>(eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[${iHtmlObs}=${id}]`)!;
};
export const gObsFn = <ElemType extends HTMLElement>(eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[${iFnObs}=${id}]`)!;
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
    }),
    observe,
    unObserve: unregister,
    $h: (key: keyof typeof state) => {
      const qId = obsInnerHtml();
      observe([key], () => {
        const elem = gObsIHtml(qId);
        elem.innerHTML = String(state[key]);
      });
      return qId;
    },
    $a: (key: keyof typeof state, attributeName: string) => {
      const qId = obsAttr();
      observe([key], () => {
        const elem = gObsAttr(qId);
        elem.setAttribute(attributeName, String(state[key]));
      });
      return `${qId} ${attributeName}=${state[key]}`;
    },
    $f: (keys: (keyof typeof state)[], fn: () => string) => {
      const qId = obsFn();
      observe(keys, () => {
        const elem = gObsFn(qId);
        elem.innerHTML = fn();
      });
      return qId;
    },
  };
}
