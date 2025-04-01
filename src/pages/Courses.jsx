import { useState } from 'react';
import Course from '../components/Course';

const coursesData = [
  { id: 'Green', name: 'Green Course', games: 12 },
  { id: 'Blue', name: 'Blue Course', games: 13 },
  { id: 'Silver', name: 'Silver Course', games: 8 },
  { id: 'Red', name: 'Red Course', games: 14 },
  { id: 'Kids 1', name: 'Kids 1', games: 11 },
  { id: 'Kids 2', name: 'Kids 2', games: 10 },
];

function Courses() {
  const [activeCourse, setActiveCourse] = useState(null);

  return (
    <div className='course-list-container'>
      {coursesData.map((course) => (
        <Course
          key={course.id}
          course={course}
          isOpen={activeCourse === course.id}
          onToggle={() =>
            setActiveCourse(activeCourse === course.id ? null : course.id)
          }
        />
      ))}
    </div>
  );
}

export default Courses;
