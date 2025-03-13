function Courses() {
  return (
    <div className='courses-container'>
      <div className='courses'>
        <div className='monthly-inspection'>
          <h2>Inspection</h2>
          <input type='text' placeholder='Wire condition' />
          <br />
          <input type='text' placeholder='Bolt condition' />
          <br />
          <input type='text' placeholder='Ropes condition' />
          <br />
          <input type='text' placeholder='Tape condition' />
          <br />
          <input type='text-area' placeholder='Additional comments' />
        </div>
        <button className='task-list-submit'>Submit</button>
      </div>
      <h2>Repairs</h2>
    </div>
  );
}
export default Courses;
