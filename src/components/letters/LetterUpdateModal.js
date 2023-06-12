import React, { useState, useEffect, useRef } from "react";
import { updateLetter } from "../../managers/LetterManager";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

export const LetterUpdateModal = ({ letter, closeModal, onLetterUpdate }) => {
  const [editedBody, setEditedBody] = useState("");

  useEffect(() => {
    setEditedBody(letter.letter_body);
  }, [letter]);

  const handleSave = () => {
    const updatedLetter = { ...letter, letter_body: editedBody };

    updateLetter(updatedLetter, letter.id)
      .then(() => {
        onLetterUpdate();
        closeModal();
      })
      .catch((error) => console.error("Error updating letter:", error));
  };

  return (
    <Dialog open={true} onClose={closeModal} fullWidth>
      <DialogTitle>Letter Details</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          minRows={6}
          maxRows={10}
          fullWidth
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={closeModal} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
