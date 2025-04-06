import { useTasks } from './TaskContent';
import { useEffect } from 'react';
import { account, databases, Query } from '../lib/appwrite';
import { ToastContainer, toast, Slide } from 'react-toastify';

function DailyTaskList() {
  const { tasks, setTasks } = useTasks();
  const notify = () => toast('toast notification');

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
  return (
    <div className='task-list-container'>
      <div className='task-list'>
        <h1>Daily Tasks</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
        <button onClick={notify}>Click me</button>
        <ToastContainer
          position='top-right'
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
          transition={Slide}
        />
      </div>
    </div>
  );
}
export default DailyTaskList;
