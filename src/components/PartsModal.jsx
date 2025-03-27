const PartsModal = ({ closeModal }) => {
  return (
    <div className='modal'>
      <h2>Manage Clic-it Parts</h2>
      <input type='text' placeholder='Enter part details' />
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default PartsModal;
