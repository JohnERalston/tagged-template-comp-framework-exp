type initFn = () => void;

const initFns = new Set<initFn>();

const sanitizer = document.createElement("div");
// this gets rid of attributes
const getSanitizedValues = (...values: any[]) => {
  const sanitizedValues = values.map((value) => {
    sanitizer.textContent = value;
    return sanitizer.innerHTML;
  });
  return sanitizedValues;
};
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
  Array.from(initFns).forEach((init) => init());
}

const euid = () => `a${crypto.randomUUID()}`;
export const eid = (): string => `eid="${euid()}"`;
export const ge = <ElemType extends HTMLElement>(eid: string) => {
  const id = eid.split("=")[1];
  return document.querySelector<ElemType>(`[eid=${id}]`)!;
};
export const bind = (fn: initFn) => initFns.add(fn);

export const tempDelayBind = (fn: initFn) => {
  setTimeout(() => {
    fn();
  }, 500);
};
