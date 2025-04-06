import React from 'react';
import { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskContent = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, isLoading, setIsLoading }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
