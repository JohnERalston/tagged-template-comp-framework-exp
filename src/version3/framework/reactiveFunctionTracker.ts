export const rFunctionTracker = trackerFn();

function trackerFn() {
  const rFunctions: string[] = [];

  return {
    setCurrentRFn,
    getCurrentRFn,
    restorePrevRFn,
  };

  function setCurrentRFn(uid: string) {
    rFunctions.unshift(uid);
  }

  function getCurrentRFn(): string | null {
    return rFunctions[0];
  }

  function restorePrevRFn() {
    rFunctions.shift();
  }
}
