import { stateful } from "../framework/stateful";
// import { eid } from "../framework/tag";

export interface ITodoItem {
  id: string;
  name: string;
  done: boolean;
  renaming: boolean;
}

export type ObservableTodoItem = ReturnType<typeof stateful<ITodoItem>>;

const tsMs = stateful<{ todoItems: ObservableTodoItem[] }>({ todoItems: [] });
const {
  state: todoState,
  observe: observeTodo,
  unObserve: unobserveTodo,
  $a,
  $ag,
  $f,
  $h,
} = tsMs;

const todoApi = todoApiFn();

export { todoState, $f, todoApi };

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
    todoState.todoItems.push(stateful(todo));
    tsMs.state.todoItems = todoState.todoItems.slice();
    console.log(tsMs.state.todoItems);
  }

  function removeTodo(id: string) {
    tsMs.state.todoItems = todoState.todoItems.filter(
      (elem) => elem.state.id !== id
    );
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
    tsMs.state.todoItems[index].state.renaming = true;
  } else if (elem.hasAttribute("todoReadRemove")) {
    todoApi.removeTodo(tsMs.state.todoItems[index].state.id);
  } else if (elem.hasAttribute("TodoItemEditRenameBtn")) {
    const elem = document.getElementById("TodoItemEditIp") as HTMLInputElement;
    tsMs.state.todoItems[index].state.name = elem.value;
    tsMs.state.todoItems[index].state.renaming = false;
  } else if (elem.hasAttribute("TodoItemEditCancelBtn")) {
    tsMs.state.todoItems[index].state.renaming = false;
  }
});
