import { attrObs, iFnObs, iHtmlObs } from "./attrs";
// import { newBind } from "./mutationObserver";

export function html(strings: TemplateStringsArray, ...values: any[]) {
  const sanitizedValues = values; // getSanitizedValues(values);

  let container = "";

  strings.forEach((str, index) => {
    container += str; // Append the static string part

    if (index < sanitizedValues.length) {
      container += sanitizedValues[index];
    }
  });

  return container;
}

export function mount(selector: string, element: string) {
  const mountTo = document.querySelector(selector);
  if (mountTo) {
    mountTo.innerHTML = element;
  } else {
    console.warn(`Not mounted, unable to find selector: ${selector}`);
  }
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
