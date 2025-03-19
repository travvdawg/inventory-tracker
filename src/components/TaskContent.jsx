import React from 'react';
import { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskContent = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Inspect harnesses' },
    { id: 2, text: 'Refill bandaids' },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
