const RepairModal = ({ closeModal }) => {
  return (
    <div className='modal'>
      <h2>Report a Repair</h2>
      <input type='text' placeholder='Describe the issue' />
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default RepairModal;
