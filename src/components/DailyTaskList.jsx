import { useTasks } from './TaskContent';
import { useEffect } from 'react';
import { account, databases, Query } from '../lib/appwrite';
import { ToastContainer, toast } from 'react-toastify';

function DailyTaskList() {
  const { tasks, setTasks } = useTasks();
  const errMessage = () => toast.error('You are not allowed to delete tasks');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID
        );
        const fetchedTasks = res.documents.map((doc) => ({
          id: doc.$id,
          text: doc.text,
        }));
        setTasks(fetchedTasks);
      } catch (err) {
        console.log('Error fetching tasks: ', err);
      }
    };
    fetchTasks();
  }, [setTasks]);

  const deleteTask = async (id) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id
      );
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      errMessage();
      console.log('Failed to delete task:', err);
    }
  };

  return (
    <div className='task-list-container'>
      <div className='task-list'>
        <h1>Daily Tasks</h1>
        <ul className='task-items'>
          {tasks.map((task) => (
            <li key={task.id} className='task-item'>
              <span className='task-text'>{task.text}</span>
              <button
                className='delete-btn'
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}
export default DailyTaskList;
