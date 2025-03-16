export const TodoReducer = (state, action) => {
  switch (action.type) {
    case "input":
      // Update the input value in state
      return [{ item: action.payload }, state[1], state[2], state[3]];
    case "list":
      //if there is action.payload that means the task is ticked
      // so, i will match it with the arg which is todoText passed from the checkBox and if it's indeed matched, i will update the checkedStatus with checkedStatus from passed arg
      if (action.payload) {
        const updatedCheckedList = state[1].listItem.map((todoItem) => {
          if (todoItem.todoText === action.payload.text) {
            return {
              todoText: todoItem.todoText,
              checkedStatus: action.payload.checkedStatus,
            };
          }
          return todoItem;
        });
        console.log(updatedCheckedList);
        return [
          state[0],
          {
            listItem: updatedCheckedList,
          },
          state[2],
          state[3],
        ];
      }
      // Add a new item to the list
      //this one doesnt need payload to add items as the item is alreay in input case
      return [
        state[0],
        {
          listItem: [
            {
              todoText: state[0].item,
              checkedStatus: false,
              isExiting: false,
            },
            ...state[1].listItem,
          ],
        },
        state[2],
        { taskLimit: state[3].taskLimit + 1 },
      ];
    case "updateArray":
      //if length of passed arr and state array are same, it means it only changed the isExit value
      if (action.payload.length === state[1].listItem.length) {
        return [state[0], { listItem: action.payload }, state[2], state[3]];
      } else {
        return [
          state[0],
          { listItem: action.payload },
          state[2],
          { taskLimit: state[3].taskLimit - 1 },
        ];
      }

    case "cleanItem":
      // Clear the input field
      return [{ item: "" }, state[1], state[2], state[3]];
    case "todo":
      return [state[0], state[1], { todoIntro: action.payload }, state[3]];
    case "tasklimit":
      return [state[0], state[1], state[2], { taskLimit: action.payload }];
    default:
      return state;
  }
};
