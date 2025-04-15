import React, { useEffect, useState } from 'react';
import { databases, Query } from '../lib/appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const HARDWARE_ID = import.meta.env.VITE_APPWRITE_HARDWARE_ID;

const Inventory = () => {
  const [hardwareList, setHardwareList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all hardware items
  useEffect(() => {
    async function fetchHardware() {
      try {
        const res = await databases.listDocuments(DATABASE_ID, HARDWARE_ID);
        setHardwareList(res.documents);
      } catch (err) {
        console.error('Error fetching inventory:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHardware();
  }, []);

  const handleDecrement = async (id, currentAmount) => {
    const newAmount = Math.max(currentAmount - 1, 0);

    try {
      await databases.updateDocument(DATABASE_ID, HARDWARE_ID, id, {
        amount: newAmount,
      });

      setHardwareList((prev) =>
        prev.map((item) =>
          item.$id === id ? { ...item, amount: newAmount } : item
        )
      );
    } catch (err) {
      console.error('Failed to update amount:', err);
    }
  };

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div>
      <h2>Inventory</h2>
      <div>
        {hardwareList.map((item) => (
          <div key={item.$id}>
            <h3>{item.hardwareName}</h3>
            <p>Amount: {item.amount}</p>
            <button onClick={() => handleDecrement(item.$id, item.amount)}>
              Decrement
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
