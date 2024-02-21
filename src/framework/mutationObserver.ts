import { compActive, compPending } from "./attrs";

interface NewBindProps {
  cid: string;
  onAdded: () => void;
  onRemoved: () => void;
}

const obsMap = new Map<string, NewBindProps>();

const config: MutationObserverInit = {
  childList: true,
  subtree: true,
};
const callback: MutationCallback = (mutationsList) => {
  function getElements(nodes: Node[], matchAttr: string): HTMLElement[] {
    return nodes
      .filter((node) => node.nodeType === node.ELEMENT_NODE)
      .map((node) => node as HTMLElement)
      .filter((elem) => elem.hasAttribute(matchAttr));
  }

  function handleAdded() {
    const comps = document.querySelectorAll(`[${compPending}]`);
    comps.forEach((comp) => {
      const id = comp.getAttribute(compPending)!;
      obsMap.get(id)?.onAdded();
      comp.setAttribute(compActive, id);
      comp.removeAttribute(compPending);
    });
  }
  function handleRemoved(mutation: MutationRecord) {
    const elements = getElements(Array.from(mutation.removedNodes), compActive);
    elements.forEach((element) => {
      const comps = [element, ...element.querySelectorAll(`[${compActive}]`)];
      comps.forEach((comp) => {
        const id = comp.getAttribute(compActive)!;
        const found = obsMap.get(id);
        found?.onRemoved();
      });
    });
  }

  mutationsList.forEach((mutation) => {
    if (mutation.type !== "childList") {
      return;
    }
    handleAdded();
    handleRemoved(mutation);
  });
};

const observer = new MutationObserver(callback);

observer.observe(document.documentElement, config);

export const newBind = (props: NewBindProps) => {
  const key = props.cid.split("=")[1].replaceAll('"', "");
  obsMap.set(key, props);
};
