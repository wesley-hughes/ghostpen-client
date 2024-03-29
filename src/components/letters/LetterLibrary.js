import React, { useEffect, useState } from "react";
import {
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Tooltip,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutline,
  FileCopyOutlined,
  ClearOutlined,
} from "@mui/icons-material";
import { deleteLetter, getLetters } from "../../managers/LetterManager";
import { LetterUpdateModal } from "./LetterUpdateModal";
import { copyToClipboard } from "../utils/copyToClipboard";
import { debounce } from "lodash";
import { getCampaigns } from "../../managers/CampaignManager";
import { styled } from "@mui/system";

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  margin: "auto",
});

const TextContainer = styled("div")({
  marginTop: "24px",
});

export const LetterLibrary = () => {
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [contactFilter, setContactFilter] = useState("");
  const [editSnackbarOpen, setEditSnackbarOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [copySnackbarOpen, setCopySnackbarOpen] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const fetchLetters = () => {
    getLetters(campaign, contactFilter)
      .then((data) => {
        setLetters(data);
      })
      .catch((error) => console.error("Error fetching letters:", error));
  };

  useEffect(() => {
    getCampaigns().then((data) => setCampaigns(data));
  }, []);

  useEffect(() => {
    fetchLetters();
  }, [contactFilter, campaign]);

  const debouncedFetchLetters = debounce(fetchLetters, 300);

  const handleDelete = (letterId) => {
    deleteLetter(letterId)
      .then(() => {
        fetchLetters();
        setDeleteSnackbarOpen(true);
      })
      .catch((error) => console.error("Error deleting letter:", error));
  };

  const handleCopy = (body) => {
    copyToClipboard(body);
    setCopySnackbarOpen(true);
  };

  const handleEdit = (letter) => {
    setSelectedLetter(letter);
  };

  const handleLetterUpdate = () => {
    fetchLetters();
    setEditSnackbarOpen(true);
  };

  const closeModal = () => {
    setSelectedLetter(null);
  };

  const handleCampaignChange = (event) => {
    setCampaign(event.target.value);
  };

  return (
    <FormContainer>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Contact"
          value={contactFilter}
          onChange={(e) => {
            setContactFilter(e.target.value);
            debouncedFetchLetters();
          }}
          placeholder="Search by contact name"
          fullWidth
          sx={{ mb: 1, mt: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setContactFilter("")}
                  disabled={!contactFilter}
                >
                  <ClearOutlined fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Campaign</InputLabel>
          <Select value={campaign} onChange={handleCampaignChange}>
            <MenuItem value="">None</MenuItem>
            {campaigns.map((cam) => (
              <MenuItem key={cam.id} value={cam.id}>
                {cam.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

        <TableContainer component={Paper}  sx={{ maxHeight: "calc(100vh - 300px)", mt: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {letters.map((letter) => (
                <TableRow key={letter.id}>
                  <TableCell>{letter.date}</TableCell>
                  <TableCell>{`${letter.contact.first_name} ${letter.contact.last_name}`}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(letter)}
                      >
                        <EditOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(letter.id)}
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy">
                      <IconButton
                        size="small"
                        onClick={() => handleCopy(letter.letter_body)}
                      >
                        <FileCopyOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
 

      {selectedLetter && (
        <LetterUpdateModal
          letter={selectedLetter}
          closeModal={closeModal}
          onLetterUpdate={handleLetterUpdate}
        />
      )}
      <Snackbar
        open={editSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setEditSnackbarOpen(false)}
        message="Letter updated successfully"
      />
      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setDeleteSnackbarOpen(false)}
        message="Letter deleted successfully"
      />
      <Snackbar
        open={copySnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setCopySnackbarOpen(false)}
        message="Letter copied to clipboard"
      />
    </FormContainer>
  );
};
