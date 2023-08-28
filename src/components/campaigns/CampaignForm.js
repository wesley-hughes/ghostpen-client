import { useState, useEffect } from "react";
import { TextField, Button, FormControl, Autocomplete } from "@mui/material";
import { styled } from "@mui/system";
import { getContactById, getContacts } from "../../managers/ContactManager";
import {
  addTargetedContacts,
  createCampaign,
  getCampaigns,
  updateCampaign,
} from "../../managers/CampaignManager";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "400px",
  margin: "auto",
});

export const CampaignForm = ({ campaign, onSave }) => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  // const findContacts = (ids) => {
  //   let contObjects = [];
  //   ids.map((id) => contObjects.push(getContactById(id)));
  //   return contObjects;
  // };
  useEffect(() => {
    getContacts()
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error retrieving contacts:", error));
  }, []);

  useEffect(() => {
    if (campaign !== null) {
      setLabel(campaign.label);
      setDescription(campaign.description);
      if (contacts.length) {
        let contactsList = contacts.filter(contact => campaign.contacts.includes(contact.id));
        setSelectedContacts(contactsList);
      }
    } else {
      clearForm();
    }
  }, [campaign, contacts]);

  // useEffect(() => {
  //   if (campaign !== null) {
  //     setLabel(campaign.label);
  //     setDescription(campaign.description);
  //     let contactslist = findContacts(campaign.contacts);
  //     setSelectedContacts(contactslist);
  //   } else {
  //     clearForm();
  //   }
  // }, [campaign]);

  useEffect(() => {
    getContacts()
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error retrieving contacts:", error));
  }, []);

  const clearForm = () => {
    setLabel("");
    setDescription("");
    setSelectedContacts([]);
  };

  const handleContactChange = (event, values) => {
    setSelectedContacts(values);
  };

  const handleSubmit = async () => {
    try {
      if (campaign == null) {
        const createdCampaign = await createCampaign({
          label: label,
          description: description,
        });
        const campaignId = createdCampaign.id;

        if (selectedContacts.length > 0) {
          let contactIds = [];
          selectedContacts.map((sc) => contactIds.push(sc.id));

          const targetData = { contacts: contactIds };
          await addTargetedContacts(campaignId, targetData);
        }
      } else {
        const editedCampaign = {
          id: campaign.id,
          label: label,
          description: description,
        };
        updateCampaign(campaign.id, editedCampaign);

        if (selectedContacts.length > 0) {
          let contactIds = [];
          selectedContacts.map((sc) => {
            contactIds.push(sc.id);
            return contactIds;
          });

          const targetData = { contacts: contactIds };
          await addTargetedContacts(campaign.id, targetData);
        }
      }

      onSave && onSave();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className="contact-page">
      <FormContainer>
        <TextField
          label="Campaign Name"
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <TextField
          label="Campaign Description"
          multiline
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl>
          <Autocomplete
            multiple
            options={contacts}
            getOptionLabel={(contact) => contact.name}
            value={selectedContacts}
            onChange={handleContactChange}
            renderInput={(params) => (
              <TextField {...params} label="Targeted Contacts" />
            )}
            limitTags={10}
          />
        </FormControl>
        <Button type="button" variant="contained" onClick={handleSubmit}>
          {campaign !== null ? "Update Campaign" : "Create Campaign"}
        </Button>
      </FormContainer>
    </div>
  );
};
