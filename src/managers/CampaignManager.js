import { getToken } from "../components/utils/getToken";

export const getCampaigns = () => {
    return fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/campaigns", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    }).then((res) => res.json());
  };

  export const createCampaign = (newCampaign) => {
    return fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify(newCampaign),
    }).then((res) => res.json());
  };

  export const deleteCampaign = (campaignId) => {
    return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/campaigns/${campaignId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
  };

  export const updateCampaign = (campaignId, updatedCampaign) => {
    return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/campaigns/${campaignId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify(updatedCampaign),
    });
  };

  export const getCampaignById = (id) => {
    return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/campaigns/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((res) => res.json());
  };

  export const addTargetedContacts = (id, selectedContacts) => {
    return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/campaigns/${id}/target`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify(selectedContacts),
    }).then((res) => res.json());
  };