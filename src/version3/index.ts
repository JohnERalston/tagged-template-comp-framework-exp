import { $f } from "./framework/reactiveFns";
import { html, mount } from "./framework/tag";
import { createStore } from "./framework/uiStore";

const store = createStore({ count: 0, date: new Date().toISOString() });

setInterval(() => {
  store.updateStore((store) => ({ count: store.count + 1 }));
}, 4000);

setInterval(() => {
  store.updateStore({ date: new Date().toISOString() });
}, 7000);

function TesterComp() {
  function CountUpdater(uid: string) {
    const { count } = store.useStore(uid);
    return () => {
      return String(count);
    };
  }

  function DateUpdater(uid: string) {
    const { date } = store.useStore(uid);
    return () => String(date);
  }

  return html`
    <div>
      <h4>Count <span ${$f(CountUpdater)}>${store.data().count}</span></h4>
    </div>
    <div>
      <h4>Date <span ${$f(DateUpdater)}>${store.data().date}</span></h4>
    </div>
  `;
}

mount("#app", TesterComp());
