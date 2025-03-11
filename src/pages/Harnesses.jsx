function Harnesses() {
  return (
    <div className='harness-container'>
      <div className='harness'>
        <div className='monthly-inspections'>
          <h2>Monthly Inspection</h2>
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

        {/* <h2>Repairs</h2>
        <h2>Clic-it Parts</h2> */}
      </div>
    </div>
  );
}
export default Harnesses;
