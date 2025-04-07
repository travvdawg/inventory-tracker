import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import InspectionAnswers from './InspectionAnswers';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const InspectionModal = ({ closeModal }) => {
  const harnessRef = useRef(null);
  const commentsRef = useRef(null);
  const answerRefs = useRef([]);

  const success = () => toast.success('Inspection Submitted!');

  const inspectionFields = [
    'Webbing condition',
    'Webbing at tie-in point',
    'Load-bearing stitching',
    'Gear loop',
    'Attachment buckles',
    'Double lanyard',
    'Pulley sling',
    'Carabiners',
    'Quick link',
    'Pulley',
  ];

  const generatePDF = () => {
    const pdf = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    const harnessNum = harnessRef.current?.value || 'N/A';
    const comments = commentsRef.current?.value || 'No additional comments';

    const answers = inspectionFields.map((field, i) => {
      const selectElement = answerRefs.current[i];
      return `${field}: ${selectElement?.value || 'N/A'}`;
    });

    pdf.setFontSize(16);
    pdf.text('Monthly Harness Inspection', 10, 10);
    pdf.setFontSize(12);
    pdf.text(`Date: ${currentDate}`, 10, 20);
    pdf.text(`Harness Number: ${harnessNum}`, 10, 30);

    let yPosition = 40;
    answers.forEach((answer) => {
      pdf.text(answer, 10, yPosition);
      yPosition += 10;
    });

    pdf.text('Additional Comments:', 10, yPosition + 10);
    pdf.text(comments, 10, yPosition + 20, { maxWidth: 180 });

    pdf.save('harness_inspection.pdf');

    success();
  };

  return (
    <div className='modal'>
      <h2>Monthly Harness Inspection</h2>
      <select className='harness-number' ref={harnessRef}>
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
      {inspectionFields.map((field, i) => (
        <InspectionAnswers
          key={i}
          label={field}
          ref={(el) => (answerRefs.current[i] = el)}
        />
      ))}
      <textarea placeholder='Additional comments' ref={commentsRef}></textarea>
      <div className='modal-buttons'>
        <button onClick={generatePDF}>Submit</button>
        <button onClick={closeModal}>Close</button>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
    </div>
  );
};

export default InspectionModal;
