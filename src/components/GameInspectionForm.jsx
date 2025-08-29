import { useEffect, useState } from 'react';
import { ID, Permission, Role } from 'appwrite';
import { databases, storage, Query } from '../lib/appwrite';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COURSE_COLLECTION_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

function GameInspectionForm({ courseId, gameNumber, onImageUploadComplete }) {
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

  const success = () => toast.success('Information updated!');

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
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key]) => !key.startsWith('$'))
      );

      if (docId) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          docId,
          filteredData
        );
      } else {
        const newDoc = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            courseId,
            gameNumber,
            ...filteredData,
          }
        );
        setDocId(newDoc.$id);
      }

      success();
    } catch (error) {
      console.error('Error saving game data:', error);
      toast.error('Error saving data');
    }
  };

  const resizeImage = (
    file,
    maxWidth = 1280,
    maxHeight = 1280,
    format = 'image/jpeg',
    quality = 0.8
  ) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;

          // keep aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const newFile = new File(
                  [blob],
                  file.name.replace(/\.\w+$/, '.jpg'),
                  {
                    type: format,
                  }
                );
                resolve(newFile);
              } else {
                reject(new Error('Resize failed'));
              }
            },
            format,
            quality
          );
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const BUCKET_ID = import.meta.env.VITE_APPWRITE_GAME_IMAGES;

  const handleFileUpload = async (event) => {
    const inputFile = event.target.files[0];
    if (!inputFile) return;

    try {
      // shrink to ~1280px wide/tall before upload
      const safeFile = await resizeImage(inputFile, 1280, 1280);

      const uploadedFile = await storage.createFile(
        import.meta.env.VITE_APPWRITE_GAME_IMAGES,
        'unique()',
        safeFile,
        [Permission.read(Role.any())]
      );

      console.log('Upload success:', uploadedFile);

      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
        imageId: uploadedFile.$id,
      });

      toast.success('Image uploaded and linked!');

      if (onImageUploadComplete) onImageUploadComplete();
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Image upload failed.');
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
          <option value='square'>Both</option>
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

      <input
        type='file'
        accept='image/jpeg,image/png'
        capture='environment'
        onChange={handleFileUpload}
      />

      <button onClick={handleSave} className='save-btn'>
        Save
      </button>
      <ToastContainer />
    </div>
  );
}

export default GameInspectionForm;
