import { useReducer, useRef } from "react";
import React from "react";
import { Checkbox } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AnimatePresence, motion } from "framer-motion";
import { TodoReducer } from "../Reducers/TodoReducer";

const slideDownInVariant = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: {
    opacity: 1,
    y: 0,
  },

  closed: {},
};

const todoTasksVariant = {
  hidden: { opacity: 0, x: "-100vw" },
  visible: {
    opacity: 1,
    x: 0,
  },
  closed: {
    opacity: 0,
    x: "100vw",
    transition: {
      type: "spring",
      stiffness: 120,
      delay: 0,
    },
  },
};

function Todo() {
  // Initial state for the todo list
  const initialState = [
    { item: "" },
    { listItem: [] },
    { todoIntro: true },
    { taskLimit: 0 },
  ];
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  // Create a ref for todo items
  // const todoItem = useRef([]);
  // const ref = React.createRef();

  // Handle input changes
  const handleChange = (e) => {
    // Dispatch an action to update the input field value
    dispatch({ type: "input", payload: e.target.value });
  };

  //below definitely messy and that's my bad
  // here, i passed checktodotext so that i will do map function inside the reducer to just update the checkedStatus of tasks
  const handleCheck = (e, checkTodoText) => {
    dispatch({
      type: "list",
      payload: { text: checkTodoText, checkedStatus: e.target.checked },
    });
    console.log(e.target.index);
  };

  // Handle adding an item to the list
  const addList = () => {
    if (state[0].item) {
      if (state[3].taskLimit < 6) {
        if (
          !state[1].listItem.some((item) => item.todoText === state[0].item)
        ) {
          // Dispatch actions to add a new item and clear the input field
          dispatch({ type: "list" });
          dispatch({ type: "cleanItem" });
        } else {
          alert("Your task is already in the list");
        }
      } else {
        alert("Your Tasks are already reached the limit");
      }
    } else {
      alert("Input Something First!");
    }
  };

  // Handle item deletion
  const handleDelete = (deleteTodo) => {
    const updatedArray = state[1].listItem.map((item) =>
      item.todoText === deleteTodo
        ? { ...item, isExiting: true } // Mark the item as exiting
        : item
    );

    dispatch({ type: "updateArray", payload: updatedArray });

    const deletedArray = state[1].listItem.filter(
      (i) => deleteTodo !== i.todoText
    );
    // Dispatch an action to update the list with the deleted item removed
    setTimeout(() => {
      dispatch({ type: "updateArray", payload: deletedArray });
    }, 500);
  };

  return (
    <motion.div
      className={`w-[100%] max-h-[30%] lg:w-[45%] lg:h-[100%] lg:max-h-[100%] flex flex-col lg:flex-row items-center`}
    >
      {!state[2].todoIntro ? (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            className={`w-[100%] h-[100%] flex flex-col justify-center`}
          >
            <div className={`flex gap-2 mb-2`}>
              <input
                className=" w-full text-[16px] pl-[5px] font-semibold rounded-sm bg-[#ffffff00] border-2 border-sky-100 border-opacity-30 backdrop-blur-sm focus:outline-none"
                value={state[0].item}
                onChange={handleChange}
                placeholder="search"
                onKeyDown={(e) => e.key === "Enter" && addList()}
              />
              <button
                className="text-green-700 font-bold flex justify-center items-center text-lg bg-[#ffffff66] rounded-[50%] w-[30px] h-[30px] backdrop-blur-xl"
                onClick={addList}
              >
                +
              </button>
            </div>
            <div
              className={`shadow-inbox shadow-slate-200 flex flex-grow flex-nowrap flex-col items-center justify-evenly gap-y-2 py-2 overflow-y-auto overflow-x-hidden`}
            >
              {state[1].listItem.length > 0 ? (
                state[0].item ? (
                  state[1].listItem
                    .filter((filteredItem) =>
                      filteredItem.todoText
                        .toLowerCase()
                        .includes(state[0].item.toLowerCase())
                    )
                    .map((filteredItem, index) => {
                      return (
                        <div
                          className="flex w-[95%] mx-auto lg:h-[calc(80%/6)] font-semibold justify-between items-center px-2 bg-gradient-to-br from-white/20 to-white/10 border border-white border-opacity-50"
                          key={index}
                        >
                          <Checkbox
                            color={`default`}
                            onChange={(e) => handleCheck(e, todo.todoText)}
                          />
                          <div>{filteredItem.todoText}</div>
                          <DeleteOutlineIcon
                            className="cursor-pointer text-red-800 shadow-red-600 hover:shadow-inbox rounded-md"
                            onClick={() => handleDelete(filteredItem.todoText)}
                          />
                        </div>
                      );
                    })
                ) : (
                  state[1].listItem.map((todo, index) => {
                    return (
                      <AnimatePresence mode="wait" key={todo.todoText}>
                        {!todo.isExiting && (
                          <motion.div
                            variants={todoTasksVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{
                              type: "spring",
                              stiffness: 120,
                              delay: 0.1 * index,
                            }}
                            exit="closed"
                            className="flex w-[95%] lg:w-[calc(90%)] mx-auto lg:h-[calc(80%/6)] font-semibold justify-between items-center px-2 bg-gradient-to-br from-white/20 to-white/10 border border-white border-opacity-50"
                            key={todo.todoText} // here with map function reloading all the time, using index might lead to unexpected issues
                          >
                            <Checkbox
                              color={`default`}
                              onChange={(e) => handleCheck(e, todo.todoText)}
                            />
                            <div
                              className={`${
                                todo.checkedStatus ? "line-through" : ""
                              }`}
                            >
                              {todo.todoText}
                            </div>
                            <DeleteOutlineIcon
                              className="cursor-pointer text-red-800 shadow-red-600 hover:shadow-inbox rounded-md"
                              onClick={() => handleDelete(todo.todoText)}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  })
                )
              ) : (
                <h3 className={`text-[0.5 rem] p-2`}>
                  You have not assigned any tasks for today
                </h3>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          variants={slideDownInVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
          className={`w-[100%] flex flex-col justify-center items-center`}
        >
          <div>This is the intro text for the todo task</div>
          <div
            className={`w-[50%] cursor-pointer border-black border-2 border-opacity-15 bg-white rounded-md `}
            onClick={() =>
              dispatch({ type: "todo", payload: !state[2].todoIntro })
            }
          >
            start
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Todo;
