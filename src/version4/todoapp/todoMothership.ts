import { renderEngine } from "../framework/renderEngine";

export interface ITodoItem {
  id: string;
  name: string;
  done: boolean;
  renaming: boolean;
}

function getTodo(name: string): ITodoItem {
  return {
    id: crypto.randomUUID(),
    name,
    done: false,
    renaming: false,
  };
}

const todoList = {
  items: [getTodo("one"), getTodo("2")],
};

const todoApi = todoApiFn();

export { todoList, todoApi };

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

    todoList.items.push(todo);
    todoList.items = todoList.items.slice();
  }

  function removeTodo(id: string) {
    todoList.items = todoList.items.filter((elem) => elem.id !== id);
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
    renderEngine.renderIfChangedAll();
  } else if (elem.hasAttribute("todoReadEdit")) {
    todoList.items[index].renaming = true;
    renderEngine.renderIfChangedAll();
  } else if (elem.hasAttribute("todoReadRemove")) {
    const id = todoList.items[index].id;
    todoApi.removeTodo(id);
    renderEngine.renderIfChangedAll();
  } else if (elem.hasAttribute("TodoItemEditRenameBtn")) {
    const elem = document.getElementById("TodoItemEditIp") as HTMLInputElement;
    todoList.items[index].name = elem.value;
    todoList.items[index].renaming = false;
    renderEngine.renderIfChangedAll();
  } else if (elem.hasAttribute("TodoItemEditCancelBtn")) {
    todoList.items[index].renaming = false;
    renderEngine.renderIfChangedAll();
  }
});
