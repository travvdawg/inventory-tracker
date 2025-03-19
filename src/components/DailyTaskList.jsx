import { useTasks } from './TaskContent';

function DailyTaskList() {
  const { tasks } = useTasks();
  return (
    <div className='task-list-container'>
      <div className='task-list'>
        <h1>Daily Tasks</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
        {/* <button className='task-list-submit'>Daily task list</button> */}
      </div>
    </div>
  );
}
export default DailyTaskList;
