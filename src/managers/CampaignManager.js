import { getToken } from "../components/utils/getToken";

export const getCampaigns = () => {
    return fetch("http://localhost:8000/campaigns", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    }).then((res) => res.json());
  };

  export const createCampaign = (newCampaign) => {
    return fetch("http://localhost:8000/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify(newCampaign),
    }).then((res) => res.json());
  };

  export const deleteCampaign = (campaignId) => {
    return fetch(`http://localhost:8000/campaigns/${campaignId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
  };

  export const updateCampaign = (campaignId, updatedCampaign) => {
    return fetch(`http://localhost:8000/campaigns/${campaignId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify(updatedCampaign),
    });
  };

  export const getCampaignById = (id) => {
    return fetch(`http://localhost:8000/campaigns/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((res) => res.json());
  };

  export const addTargetedContacts = (id, selectedContacts) => {
    return fetch(`http://localhost:8000/campaigns/${id}/target`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify(selectedContacts),
    }).then((res) => res.json());
  };