import InspectionAnswers from './InspectionAnswers';

const InspectionModal = ({ closeModal }) => {
  return (
    <div className='modal'>
      <h2>Monthly Harness Inspection</h2>
      <select className='harness-number'>
        <option value=''>--Harness Number--</option>
        {[...Array(200)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
        {[...Array(30)].map((_, i) => (
          <option key={`K${i + 1}`} value={`K${i + 1}`}>
            Kids {i + 1}
          </option>
        ))}
      </select>
      {/* <InspectionAnswers /> */}
      <input type='text' placeholder='Webbing condition' />
      <input type='text' placeholder='Webbing at tie-in point' />
      <input type='text' placeholder='Load-bearing stitching' />
      <input type='text' placeholder='Gear loop' />
      <input type='text' placeholder='Attachmennt buckles' />
      <input type='text' placeholder='Double lanyard' />
      <input type='text' placeholder='Pulley sling' />
      <input type='text' placeholder='Carabiners' />
      <input type='text' placeholder='Quick link' />
      <input type='text' placeholder='Pulley' />
      <textarea placeholder='Additional comments'></textarea>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default InspectionModal;
