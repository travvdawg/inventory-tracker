import { useEffect, useState } from 'react';
import { ID, databases, Query } from '../lib/appwrite';

const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COURSE_COLLECTION_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

function GameInspectionForm({ courseId, gameNumber }) {
  const [formData, setFormData] = useState({
    topUBoltSize: '',
    hasRopes: false,
    ropeLength: '',
    middleUBoltSize: '',
    woodLength: '',
    screws: '',
    nutSize: '',
  });

  const [docId, setDocId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [
            Query.equal('courseId', courseId),
            Query.equal('gameNumber', gameNumber),
          ]
        );

        if (response.documents.length > 0) {
          const doc = response.documents[0];
          setFormData(doc);
          setDocId(doc.$id);
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    }

    fetchData();
  }, [courseId, gameNumber]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (docId) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          docId,
          formData
        );
      } else {
        const newDoc = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            courseId,
            gameNumber,
            ...formData,
          }
        );
        setDocId(newDoc.$id);
      }
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  };

  return (
    <div className='game-inspection-form'>
      <label>
        Top U-Bolt Size:
        <input
          type='text'
          name='topUBoltSize'
          value={formData.topUBoltSize}
          onChange={handleChange}
        />
      </label>

      <label>
        Has Ropes?
        <input
          type='checkbox'
          name='hasRopes'
          checked={formData.hasRopes}
          onChange={handleChange}
        />
      </label>

      {formData.hasRopes && (
        <label>
          Rope Length:
          <input
            type='text'
            name='ropeLength'
            value={formData.ropeLength}
            onChange={handleChange}
          />
        </label>
      )}

      <label>
        Middle U-Bolt Size:
        <input
          type='text'
          name='middleUBoltSize'
          value={formData.middleUBoltSize}
          onChange={handleChange}
        />
      </label>

      <label>
        Wood Length:
        <input
          type='text'
          name='woodLength'
          value={formData.woodLength}
          onChange={handleChange}
        />
      </label>

      <label>
        Screws:
        <select name='screws' value={formData.screws} onChange={handleChange}>
          <option value=''>None</option>
          <option value='torx'>Torx</option>
          <option value='square'>Square Bit</option>
        </select>
      </label>

      <label>
        Nut Size:
        <input
          type='text'
          name='nutSize'
          value={formData.nutSize}
          onChange={handleChange}
        />
      </label>

      <button onClick={handleSave} className='save-btn'>
        Save
      </button>
    </div>
  );
}

export default GameInspectionForm;
