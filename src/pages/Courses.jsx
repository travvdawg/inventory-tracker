import CourseInspection from '../components/CourseInspection';

function Courses() {
  return (
    <div>
      <div className='course-list-container'>
        <div className='green-course'>
          <h2>Green Course</h2>
        </div>
        <div className='blue-course'>
          <h2>Blue Course</h2>
        </div>
        <div className='silver-course'>
          <h2>Silver Course</h2>
        </div>
        <div className='red-course'>
          <h2>Red Course</h2>
        </div>
        <div className='first-kids-course'>
          <h2>Kids 1</h2>
        </div>
        <div className='second-kids-course'>
          <h2>Kids 2</h2>
        </div>
      </div>
      <CourseInspection />
    </div>
  );
}
export default Courses;
