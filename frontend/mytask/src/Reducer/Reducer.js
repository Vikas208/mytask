export const initialState = {
  user: [],
  projects: [],
  task: [],
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.projects,
      };
    case "SET_TASK":
      return {
        ...state,
        task: action.tasks,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
