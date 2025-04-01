import { useState } from 'react';
import Game from './Game';

function Course({ course, isOpen, onToggle }) {
  const games = Array.from({ length: course.games }, (_, i) => i + 1);

  return (
    <div className='course-container'>
      <div className='course-header' onClick={onToggle}>
        <h2>{course.name}</h2>
      </div>
      {isOpen && (
        <div className='games-container'>
          {games.map((game) => (
            <Game key={game} courseId={course.id} gameNumber={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Course;
