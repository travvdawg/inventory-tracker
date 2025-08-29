import { useState, useEffect } from 'react';
import GameInspectionForm from './GameInspectionForm';
import { motion, AnimatePresence } from 'framer-motion';
import { storage, databases, Query } from '../lib/appwrite';

function Course({ course }) {
  const [gameImages, setGameImages] = useState({});
  const [modalView, setModalView] = useState(null); // null | 'course' | 'game'
  const [selectedGame, setSelectedGame] = useState(null);

  const fetchGameDocs = async () => {
    try {
      const res = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COURSE_COLLECTION_ID,
        [Query.equal('courseId', course.id)]
      );

      const images = {};
      for (const doc of res.documents) {
        if (doc.imageId) {
          const preview = storage.getFileView(
            import.meta.env.VITE_APPWRITE_GAME_IMAGES,
            doc.imageId
          );
          //   console.log(`Game ${doc.gameNumber} image URL:`, preview.href);
          //   console.log('Bucket ID:', import.meta.env.VITE_APPWRITE_GAME_IMAGES);
          //   console.log('Doc imageId:', doc.imageId);

          images[doc.gameNumber] = preview.href;
        }
      }

      setGameImages(images);
    } catch (err) {
      console.error('Error fetching game images:', err);
    }
  };

  useEffect(() => {
    if (modalView === 'course') fetchGameDocs();
  }, [modalView, course.id]);

  const openCourseModal = () => {
    setModalView('course');
  };

  const openGameModal = (gameNumber) => {
    setSelectedGame(gameNumber);
    setModalView('game');
  };

  const closeModal = () => {
    setModalView(null);
    setSelectedGame(null);
  };

  const games = Array.from({ length: course.games }, (_, i) => i + 1);

  useEffect(() => {
    if (modalView) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => document.body.classList.remove('modal-open');
  }, [modalView]);

  return (
    <div className='course-container'>
      <div className='course-header' onClick={openCourseModal}>
        <h2>{course.name}</h2>
      </div>

      <AnimatePresence>
        {modalView && (
          <motion.div
            className='modal-overlay'
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='modal'
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {modalView === 'course' && (
                <>
                  <h3>Select a Game for {course.name}</h3>
                  <ul className='game-list'>
                    {games.map((game) => (
                      <li
                        key={game}
                        className='game-card'
                        onClick={() => openGameModal(game)}
                      >
                        Game {game}
                        {gameImages[game] && (
                          <img src={gameImages[game]} alt={`Game ${game}`} />
                        )}
                      </li>
                    ))}
                  </ul>
                  <button className='close-btn' onClick={closeModal}>
                    ✕
                  </button>
                </>
              )}

              {modalView === 'game' && (
                <>
                  <h3>
                    {course.name} - Game {selectedGame} Inspection
                  </h3>
                  <GameInspectionForm
                    courseId={course.id}
                    gameNumber={selectedGame}
                    onImageUploadComplete={fetchGameDocs}
                  />
                  <button onClick={() => setModalView('course')}>
                    Back to Games
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Course;
