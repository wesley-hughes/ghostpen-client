import { useEffect, useState } from "react"
import { getCampaigns } from "../../managers/CampaignManager"

export const CampaignList = () => {
const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        getCampaigns().then((data) => setCampaigns(data))
    }, [])


    return <>
    {campaigns.map((campaign) => 
    <div>{campaign.label}</div>)}
    
    
    </>

}