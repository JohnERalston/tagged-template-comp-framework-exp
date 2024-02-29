import { createStore } from "../framework/uiStore";

export interface ITodoItem {
  id: string;
  name: string;
  done: boolean;
  renaming: boolean;
}

export type ReactiveTodoItem = ReturnType<typeof createStore<ITodoItem>>;

function getTodoStore(name: string): ReactiveTodoItem {
  return createStore<ITodoItem>({
    id: crypto.randomUUID(),
    name,
    done: false,
    renaming: false,
  });
}

const toDoListStore = createStore({
  todoItems: [getTodoStore("one"), getTodoStore("2")],
});

const todoApi = todoApiFn();

export { toDoListStore, todoApi };

function todoApiFn() {
  return {
    addTodo,
    removeTodo,
  };

  function addTodo(name: string) {
    const todo: ITodoItem = {
      done: false,
      id: crypto.randomUUID(),
      name,
      renaming: false,
    };
    const { todoItems } = toDoListStore.data();
    todoItems.push(createStore(todo));
    toDoListStore.updateStore({ todoItems });
  }

  function removeTodo(id: string) {
    const { todoItems } = toDoListStore.data();
    toDoListStore.updateStore({
      todoItems: todoItems.filter((elem) => elem.data().id !== id),
    });
  }
}

// handlers
// plenty room for improvement here
// such as $on("click", (e: Event) = {})
document.addEventListener("click", (event: any) => {
  const elem = event.target as HTMLElement;
  const id = elem.getAttribute("id");
  const index = Number(elem.getAttribute("idx"));
  if (id === "AddTodoItemAddBtn") {
    const elem = document.getElementById("AddTodoItemIp") as HTMLInputElement;
    todoApi.addTodo(elem.value);
  } else if (elem.hasAttribute("todoReadEdit")) {
    const todoItemStore = toDoListStore.data().todoItems[index];
    todoItemStore.updateStore({ renaming: true });
  } else if (elem.hasAttribute("todoReadRemove")) {
    const id = toDoListStore.data().todoItems[index].data().id;
    todoApi.removeTodo(id);
  } else if (elem.hasAttribute("TodoItemEditRenameBtn")) {
    const elem = document.getElementById("TodoItemEditIp") as HTMLInputElement;
    const todoItemStore = toDoListStore.data().todoItems[index];
    todoItemStore.updateStore({ name: elem.value, renaming: false });
  } else if (elem.hasAttribute("TodoItemEditCancelBtn")) {
    const todoItemStore = toDoListStore.data().todoItems[index];
    todoItemStore.updateStore({ renaming: false });
  }
});
