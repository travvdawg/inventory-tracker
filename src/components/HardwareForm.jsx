import React from 'react';
import { useState, useEffect } from 'react';

const HardwareForm = () => {
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const HARDWARE_ID = import.meta.env.VITE_APPWRITE_HARDWARE_ID;

  const [hardwareData, setHardwareData] = useState({
    hardwareName: '',
  });

  useEffect(
    (hardwareName, amount) => {
      async function fetchData() {
        try {
          const response = await databases.listDocuments(
            DATABASE_ID,
            HARDWARE_ID,
            [
              Query.equal('hardwareName', hardwareName),
              Query.equal('amount', amount),
            ]
          );

          if (response.documents.length > 0) {
            const doc = response.documents[0];
            setFormData(doc);
            setDocId(doc.$id);
          }
        } catch (error) {
          console.error('Error fetching hardware data:', error);
        }
      }

      fetchData();
    },
    [hardwareData, amount]
  );

  return (
    <div>
      <h1>{hardwareData.hardwareName}</h1>
    </div>
  );
};

export default HardwareForm;
