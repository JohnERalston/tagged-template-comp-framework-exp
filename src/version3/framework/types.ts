import { createStore } from "./uiStore";

export type rFunction = () => string;

export type UiStore = ReturnType<typeof createStore>;

export type HTML = string; // <div>Hi!</div>
export type ATTR = string; // attrName="something"

type kicker = () => void;
export type reactiveFn = () => HTML | ATTR;
// export type reactiveFnf = () => HTML;
export type reactiveConnectorFn = (uid: string) => reactiveFn;

// export type $reactiveFn = () => HTML;?

export interface Reactive {
  reactiveKickerFn: kicker;
  unobserveFn: kicker;
}
