import React, { useEffect, useState } from "react";
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from "@mui/material";
import { getCampaigns, deleteCampaign } from "../../managers/CampaignManager";
import { CampaignForm } from "./CampaignForm";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/system";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  margin: "auto",
});

export const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [createSnackbarOpen, setCreateSnackbarOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = () => {
    getCampaigns()
      .then((data) => setCampaigns(data))
      .catch((error) => console.error("Error fetching campaigns:", error));
  };

  const handleCampaignClick = (campaignId) => {
    setSelectedCampaign(campaigns.find((campaign) => campaign.id === campaignId));
    setIsFormOpen(true);
  };

  const onSave = () => {
    setIsFormOpen(false);
    setSelectedCampaign(null);
    fetchCampaigns();
  };

  const handleDeleteCampaign = (campaignId) => {
    deleteCampaign(campaignId)
      .then(() => {
        fetchCampaigns();
        setDeleteSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error deleting campaign:", error);
      });
  };

  return (
    <PageContainer>
      <Button variant="outlined" sx={{ mt: 2 }} startIcon={<AddIcon />} onClick={() => setIsFormOpen(true)}>
        Add Campaign
      </Button>

      {isFormOpen && (
        <CampaignForm campaign={selectedCampaign} onSave={onSave} />
      )}

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "calc(100vh - 300px)", mt: 2 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.label}</TableCell>
                <TableCell>
                  <Button onClick={() => handleCampaignClick(campaign.id)}>
                    <EditOutlinedIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteCampaign(campaign.id)}>
                    <DeleteOutlineIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={createSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setCreateSnackbarOpen(false)}
        message="Campaign created successfully"
      />
      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setDeleteSnackbarOpen(false)}
        message="Campaign deleted successfully"
      />
    </PageContainer>
  );
};
