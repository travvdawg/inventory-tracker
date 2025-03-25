import { useTasks } from './TaskContent';
import { useEffect } from 'react';
import { account, databases, Query } from '../lib/appwrite';

function DailyTaskList() {
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = await account.get();
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          [Query.equal('userId', user.$id)]
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
      </div>
    </div>
  );
}
export default DailyTaskList;
