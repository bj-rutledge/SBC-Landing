import Img1 from '../../images/Illaria05.jpg'
import Img2 from "../../images/Illaria06.jpg";
import Img3 from "../../images/QATA_August_2013___1sm.jpg";
import Img4 from "../../images/QATA_June_2013_Aerial_2sm.jpg";
import {Location} from "../../types";
import { Region } from '../../types';

const locations: Record<Region, Location[]> = {
  washington: [
    {
      address: "521 S. Weller Seattle WA 98104",
      title: "Uwajimaya",
      subtitle: "PacRim / Lockett",
      phone: "123-456-7890",
      email: "info@joblocation1.com",
      funFacts: "This location was completed in 2020 and features sustainable building materials.",
      imageSrc: Img1,
      content: "Some Content!",
    },
    {
      address: "22433 NE Marketplace DR REDmond WA 98053",
      title: "Redmond Ridge The lodge",
      subtitle: "Simpson Housing",
      phone: "987-654-3210",
      email: "info@joblocation2.com",
      funFacts: "This project won the best architecture award in 2019.",
      imageSrc: Img2,
      content: "",
    },
  ],
  hawaii: [
    {
      address: "Example St, Honolulu, HI 96813",
      title: "Hawaii Job 1",
      subtitle: "Project Aloha",
      phone: "808-123-4567",
      email: "info@hawaiijob1.com",
      funFacts: "This job features breathtaking ocean views.",
      imageSrc: Img3,
      content: "",
    },
    {
      address: "Another St, Maui, HI 96793",
      title: "Hawaii Job 2",
      subtitle: "Project Paradise",
      phone: "808-987-6543",
      email: "info@hawaiijob2.com",
      funFacts: "This project includes eco-friendly construction methods.",
      imageSrc: Img4,
      content: "",
    },
  ],
};

export default locations;
