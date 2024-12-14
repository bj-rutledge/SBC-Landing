/**
 * Created by BJ Rutledge
 * Date: 2024-12-13
 * Map marker locations
 **/
import { Location } from "./types";
import { Region } from "./types";
const locations: Record<Region, Location[]> = {
  washington: [
    {
      address: "521 S. Weller Seattle WA 98104",
      title: "Job Location 1",
      subtitle: "Project Alpha",
      phone: "123-456-7890",
      email: "info@joblocation1.com",
      funFacts:
        "This location was completed in 2020 and features sustainable building materials.",
      imageSrc: '../../images/flyingPanels.jpg',
      content: "Some Content!",
    },
    {
      address: "456 Another St, Seattle, WA 98102",
      title: "Job Location 2",
      subtitle: "Project Beta",
      phone: "987-654-3210",
      email: "info@joblocation2.com",
      funFacts: "This project won the best architecture award in 2019.",
      imageSrc: "../../images/flyingPanels.jpg",
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
      imageSrc: "../../images/flyingPanels.jpg",
      content: "",
    },
    {
      address: "Another St, Maui, HI 96793",
      title: "Hawaii Job 2",
      subtitle: "Project Paradise",
      phone: "808-987-6543",
      email: "info@hawaiijob2.com",
      funFacts: "This project includes eco-friendly construction methods.",
      imageSrc:
        "https://www.goconstruct.org/media/ec0pubko/hbf-construction-work-on-a-redrow-site-min.jpg?anchor=center&mode=crop&width=455&height=295&rnd=132659746009270000",
      content: "",
    },
  ],
};

export default locations;
