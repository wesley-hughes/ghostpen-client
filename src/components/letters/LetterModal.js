import { useState } from "react";
import { updateLetter } from "../../managers/LetterManager";

export const LetterModal = ({ letter, closeModal }) => {
    const [editedBody, setEditedBody] = useState(letter.body);
  
    const handleSave = () => {
      const updatedLetter = { ...letter, body: editedBody };
  
      updateLetter(updatedLetter, letter.id)
        .then(() => {
          console.log('Letter updated successfully');
          closeModal();
        })
        .catch((error) => console.error('Error updating letter:', error));
    };
  
    return (
      <div className="letter-modal">
        <h3>Letter Details</h3>
        <div className="letter-body">{letter.body}</div>
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        ></textarea>
        <button onClick={handleSave}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    );
  };
  