import { useRef } from "react";
import { useStoreCache, useStoreCacheEffect } from "@statez/react";

type Props = {};

type TTodoList = {
  tasks: string[];
  addTask: (task: string) => void;
  removeTask: (task: string) => void;
};

const SampleTodoList = (props: Props) => {
  const todoStoreCache = useStoreCache<TTodoList>(
    {
      state: {
        tasks: [],
        addTask(task) {
          if (this.tasks.includes(task)) {
            return;
          }

          this.tasks = [...this.tasks, task];
        },
        removeTask(task) {
          this.tasks = this.tasks.filter((t) => t !== task);
        },
      },

      key: "todoList",
      loader: (state) => {
        console.log("loader", state);
        const tasks = localStorage.getItem("todo");

        if (tasks) {
          state.tasks = JSON.parse(tasks);
        }
      },
      saver: (state) => {
        localStorage.setItem("todo", JSON.stringify(state.tasks));
      },
      autoLoad: true,
      enableCache: true,
    },
    ["tasks"]
  );

  useStoreCacheEffect(todoStoreCache, (noti) => {
    // todoStoreCache.store.save()
    console.log(todoStoreCache.store);
  });

  const inpRef = useRef<any>();

  const handleAdd = () => {
    todoStoreCache.store.state.addTask(inpRef.current.value);
    inpRef.current.value = "";
  };

  return (
    <div>
      <div>
        <input ref={inpRef} />
        <button onClick={handleAdd}>add</button>
        <button onClick={() => todoStoreCache.store.load()}>load</button>
        <button onClick={() => todoStoreCache.store.save()}>save</button>
      </div>
      <div>
        <button onClick={() => todoStoreCache.store.reset()}>reset</button>
        <button onClick={() => todoStoreCache.store.revert()}>revert</button>
      </div>
      <div>
        {todoStoreCache.store.state.tasks?.map((task) => {
          return <div key={task}>{task}</div>;
        })}
      </div>
    </div>
  );
};

export default SampleTodoList;
