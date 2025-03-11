function DailyTaskList() {
  return (
    <div className='task-list-container'>
      <div className='task-list'>
        <h1>Todays Tasks</h1>
        <ul>
          <li>Clean trash</li>
          <li>Replace ropes</li>
          <li>Organize tool shed</li>
          <li>Wipe down the coolers</li>
        </ul>
        <button className='task-list-submit'>Daily task list</button>
      </div>
    </div>
  );
}
export default DailyTaskList;
