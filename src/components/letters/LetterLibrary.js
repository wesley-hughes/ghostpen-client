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
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutline,
  FileCopyOutlined,
} from "@mui/icons-material";
import { getLetters, deleteLetter } from "../../managers/LetterManager";
import { LetterUpdateModal } from "./LetterUpdateModal";
import { copyToClipboard } from "../utils/copyToClipboard";
import { ClearOutlined } from "@mui/icons-material";

export const LetterLibrary = () => {
  const [filteredLetters, setFilteredLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [contactFilter, setContactFilter] = useState("");
  const [editSnackbarOpen, setEditSnackbarOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [copySnackbarOpen, setCopySnackbarOpen] = useState(false);
  const [sortBy, setSortBy] = useState(""); 

  
  useEffect(() => {
    fetchLetters();
    // eslint-disable-next-line
  }, [contactFilter, sortBy]);

  const fetchLetters = () => {
    getLetters(sortBy, contactFilter) 
      .then((data) => {
        const filteredData = data.filter((letter) => {
          const contactFullName = `${letter.contact.first_name} ${letter.contact.last_name}`;
          return contactFullName.toLowerCase().includes(contactFilter.toLowerCase());
        });

        let sortedData = filteredData;

        switch (sortBy) {
          case "dateAsc":
            sortedData = filteredData.sort((a, b) => a.date.localeCompare(b.date));
            break;
          case "dateDesc":
            sortedData = filteredData.sort((a, b) => b.date.localeCompare(a.date));
            break;
          case "lastNameAsc":
            sortedData = filteredData.sort((a, b) =>
              a.contact.last_name.localeCompare(b.contact.last_name)
            );
            break;
          case "lastNameDesc":
            sortedData = filteredData.sort((a, b) =>
              b.contact.last_name.localeCompare(a.contact.last_name)
            );
            break;
          default:
            break;
        }

        setFilteredLetters(sortedData);
      })
      .catch((error) => console.error("Error fetching letters:", error));
  };

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

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="letter-library">
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Contact"
            value={contactFilter}
            onChange={(e) => setContactFilter(e.target.value)}
            placeholder="Search by contact name"
            fullWidth
            sx={{ mb: 2 }}
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

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={handleSortByChange}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="dateAsc">Date Ascending</MenuItem>
              <MenuItem value="dateDesc">Date Descending</MenuItem>
              <MenuItem value="lastNameAsc">Last Name Ascending</MenuItem>
              <MenuItem value="lastNameDesc">Last Name Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Box
        sx={{
          mt: 2,
          maxHeight: "calc(100vh - 64px - 56px - 48px - 128px)",
          overflowY: "auto",
        }}
      >
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLetters.map((letter) => (
                <TableRow key={letter.id}>
                  <TableCell>{letter.date}</TableCell>
                  <TableCell>{`${letter.contact.first_name} ${letter.contact.last_name}`}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(letter)}>
                      <EditOutlined fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(letter.id)}
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(letter.letter_body)}
                    >
                      <FileCopyOutlined fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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
    </div>
  );
};
