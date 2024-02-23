// when added, run them to populate anything not populated
// or don't run them
// I think not running them is more desirable
// when removed, unobserve and remove from here

import { attrObs, fnObs, innerHtmlObs } from "./attrs";
import { $Map } from "./garbageCollector";

// in fact the same map can do for them all
// so I want to push the yuck observer away
// and just have callbacks here to remove

const config: MutationObserverInit = {
  childList: true,
  subtree: true,
};

// function getDescendants(removedNodes: Node[]) {

// }

export function whenRemoving(notify: (uid: string) => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, config);

  function callback(mutationsList: MutationRecord[]) {
    function getElements(nodes: Node[], matchAttr: string): string[] {
      return nodes
        .filter((node) => node.nodeType === node.ELEMENT_NODE)
        .map((node) => node as HTMLElement)
        .flatMap((elem) => Array.from(elem.querySelectorAll(`[${matchAttr}]`)))
        .map((elem) => elem.getAttribute(matchAttr)!);
    }

    function handleRemoving(mutation: MutationRecord) {
      const attrObsElements = getElements(
        Array.from(mutation.removedNodes),
        attrObs
      );
      const innerHtmlObsElements = getElements(
        Array.from(mutation.removedNodes),
        innerHtmlObs
      );
      const fnObsElements = getElements(
        Array.from(mutation.removedNodes),
        fnObs
      );

      const uids = [
        ...attrObsElements,
        ...innerHtmlObsElements,
        ...fnObsElements,
      ];

      uids.forEach((uid) => {
        notify(uid);
        $Map.delete(uid);
      });
    }

    mutationsList.forEach((mutation) => {
      if (mutation.type !== "childList") {
        return;
      }

      handleRemoving(mutation);
    });
  }
}
