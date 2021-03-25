import React, { useReducer, createContext } from "react";

type Props = {
  children: React.ReactNode;
};

type Task = {
  title: string;
  description: string;
  time: number;
};

type Action = { type: "SET_TASK"; payload: Task };

const initialState: Task[] = [];

export const Context = createContext<{
  tasks: Task[];
  dispatch: React.Dispatch<any>;
}>({ tasks: initialState, dispatch: () => null });

Context.displayName = "TasksContext";

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "SET_TASK":
      return [...state, action.payload];

    default:
      return state;
  }
}

export default function ContextProvider({ children }: Props) {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ tasks, dispatch }}>{children}</Context.Provider>
  );
}