import { createStore } from "./uiStore";

export type UiStore = ReturnType<typeof createStore>;

export type HTML = string; // <div>Hi!</div>
export type ATTR = string; // attrName="something"

export type kicker = () => void;
export type reactiveFn = () => HTML | ATTR;

export interface Reactive {
  reactiveKickerFn: kicker;
  unobserveFn: kicker;
}
