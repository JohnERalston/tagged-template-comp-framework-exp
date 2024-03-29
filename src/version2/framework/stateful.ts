import { __createStore } from "./store";
import { attrGroupObs, attrObs, fnObs, innerHtmlObs } from "./attrs";
import { $Map } from "./garbageCollector";
import { $attrMap, IAttr } from "./attrMap";

interface Stateful<T> {
  state: T;
  observe: (keys: (keyof T)[], fn: Function) => void;
  unObserve: (fn: Function) => void;
  $h: (key: keyof T) => string;
  $a: (key: keyof T, attributeName: string) => string;
  $ag: (fn: () => IAttr) => string;
  $f: (fn: () => string) => string;
}

// TODO: - this is a critical bug
// when the attribute observer functions get nested this is lost,
// i.e. on nest 1, it gets a new reference
// then wen nest 2 is over, instead of the old fn being restored
// it's simply null. So subsequent getters don't get registered
// array push/pop sounds like it can solve it but
// we need it to be null when the non observer instance of the function is called
let reactiveFunctionAtHand: (() => void) | null = null;

const extractUid = (uid: string) => {
  return uid.split("=")[1].replaceAll('"', "");
};

export const euid = () => `a${crypto.randomUUID()}`;
export const obsAttr = (): string => `${attrObs}="${euid()}"`;
export const obsAttrGroup = (): string => `${attrGroupObs}="${euid()}"`;
export const obsInnerHtml = (): string => `${innerHtmlObs}="${euid()}"`;
export const obsFn = (): string => `${fnObs}="${euid()}"`;
export const gObsAttrGroup = <ElemType extends HTMLElement>(eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[${attrGroupObs}=${id}]`)!;
};
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
        if (reactiveFunctionAtHand) {
          register(reactiveFunctionAtHand, [property]);
        }
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
    $ag: (setter: () => IAttr) => {
      const qId = obsAttrGroup();
      const fn = () => {
        const elem = gObsAttrGroup(qId);
        if (!elem) return;

        // TODO
        // DIFF

        // TODO: clean up in the garbage collector
        const mappedAttrs = $attrMap.get(extractUid(qId))!;
        Object.keys(mappedAttrs).forEach((attrName) => {
          elem.removeAttribute(attrName);
        });
        const attrs = setter();
        const attrNames = Object.keys(attrs);
        attrNames.forEach((attrName) => {
          elem.setAttribute(attrName, attrs[attrName]);
        });
        $attrMap.set(extractUid(qId), attrs);
      };
      reactiveFunctionAtHand = fn;
      const attrs = setter();
      const attrNames = Object.keys(attrs);
      reactiveFunctionAtHand = null;
      $attrMap.set(extractUid(qId), attrs);
      $Map.set(extractUid(qId), () => unregister(fn));
      const attrStrings = attrNames.map((attr) => `${attr}="${attrs[attr]}"`);
      return `${qId} ${attrStrings.join(" ")}`;
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
      reactiveFunctionAtHand = null;
      $Map.set(extractUid(qId), () => unregister(fn));
      return qId;
    },
  };
}

// let prevRFns: Set<() => void> = new Set();
// function setReactiveFnAtHand(rFn: () => void) {
//   if(reactiveFunctionAtHand) {
//     prevRFns.add(reactiveFunctionAtHand);
//   }
//   reactiveFunctionAtHand = rFn;
// }

// function unsetReactivefnAtHand(rFn: () => void) {

// }
