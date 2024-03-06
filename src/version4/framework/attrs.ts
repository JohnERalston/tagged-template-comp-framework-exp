import { ATTR } from "./types";

export const attrObs = "oa";
export const attrGroupObs = "oag";
export const innerHtmlObs = "oih";
export const fnObs = "of";

export const extractUid = (uid: string) => {
  return uid.split("=")[1].replaceAll('"', "");
};
export const euid = () => `a${crypto.randomUUID()}`;
export const obsAttr = (): ATTR => `${attrObs}="${euid()}"`;
export const obsAttrGroup = (): ATTR => `${attrGroupObs}="${euid()}"`;
export const obsInnerHtml = (): ATTR => `${innerHtmlObs}="${euid()}"`;
export const obsFn = (): ATTR => `${fnObs}="${euid()}"`;

export const gObsFn = (eid: string) => gFn(fnObs, eid);

const gFn = <ElemType extends HTMLElement>(attrName: string, eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[${attrName}=${id}]`)!;
};
