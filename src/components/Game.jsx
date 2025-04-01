import { useState } from 'react';
import GameInspectionForm from './GameInspectionForm';

function Game({ courseId, gameNumber }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='game-container'>
      <div className='game-header' onClick={openModal}>
        <h3>Game {gameNumber}</h3>
      </div>

      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <h2>
              {courseId} - Game {gameNumber} Inspection
            </h2>
            <GameInspectionForm courseId={courseId} gameNumber={gameNumber} />
            <button className='close-btn' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
