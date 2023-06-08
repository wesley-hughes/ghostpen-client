import React, { useState, useEffect } from "react";
import { updateLetter } from "../../managers/LetterManager";

export const LetterUpdateModal = ({ letter, closeModal, onLetterUpdate }) => {
  const [editedBody, setEditedBody] = useState('');

  useEffect(() => {
    setEditedBody(letter.letter_body);
  }, [letter.letter_body]);

  const handleSave = () => {
    const updatedLetter = { ...letter, letter_body: editedBody };
  
    updateLetter(updatedLetter, letter.id)
      .then(() => {
        window.alert('Letter updated successfully');
        onLetterUpdate();
        closeModal();
      })
      .catch((error) => console.error('Error updating letter:', error));
  };
  

  return (
    <div className="letter-modal">
      <h3>Letter Details</h3>
      <textarea
        value={editedBody}
        onChange={(e) => setEditedBody(e.target.value)}
      ></textarea>
      <button onClick={handleSave}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};
