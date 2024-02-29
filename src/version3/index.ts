import { $f } from "./framework/reactiveFns";
import { html, mount } from "./framework/tag";
import { createStore } from "./framework/uiStore";

const store = createStore({ count: 0, date: new Date().toISOString() });

function getTodoStore(name: string) {
  return createStore({
    id: crypto.randomUUID(),
    name,
    done: false,
    rename: false,
  });
}

const toDoListStore = createStore({
  todoItems: [getTodoStore("one"), getTodoStore("2")],
});

setInterval(() => {
  store.updateStore((store) => ({ count: store.count + 1 }));
}, 4000);

setInterval(() => {
  store.updateStore({ date: new Date().toISOString() });
}, 7000);

function TesterComp() {
  return html`
    <div>
      <h4>
        Count
        <span ${$f(() => String(store.useStore().count))}
          >${store.data().count}</span
        >
      </h4>
    </div>
    <div>
      <h4>
        Date
        <span ${$f(() => store.useStore().date)}>${store.data().date}</span>
      </h4>
    </div>
  `;
}

mount("#app", TesterComp());
