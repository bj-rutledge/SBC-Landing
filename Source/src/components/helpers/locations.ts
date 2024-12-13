
/**
 * Created by BJ Rutledge
 * Date: 2024-12-13
 * Map marker locations
 **/
import { Locations } from "./types";

const locations: Locations = {
    washington: [
      {
        address: '521 S. Weller Seattle WA 98104',
        title: 'Job Location 1',
        subtitle: 'Project Alpha',
        phone: '123-456-7890',
        email: 'info@joblocation1.com',
        funFacts: 'This location was completed in 2020 and features sustainable building materials.',
        imageUrl: 'https://www.certifymeonline.net/wp-content/uploads/2021/09/shutterstock_1247187910-e1632964983297.jpg',
        content: 'Some Content!'
      },
      {
        address: '456 Another St, Seattle, WA 98102',
        title: 'Job Location 2',
        subtitle: 'Project Beta',
        phone: '987-654-3210',
        email: 'info@joblocation2.com',
        funFacts: 'This project won the best architecture award in 2019.',
        imageUrl: 'https://www.canam-construction.com/wp-content/uploads/2021/06/img1415.jpg',
        content: ''
      }
    ],
    hawaii: [
      {
        address: 'Example St, Honolulu, HI 96813',
        title: 'Hawaii Job 1',
        subtitle: 'Project Aloha',
        phone: '808-123-4567',
        email: 'info@hawaiijob1.com',
        funFacts: 'This job features breathtaking ocean views.',
        imageUrl: 'https://www.canam-construction.com/wp-content/uploads/2021/06/img1415.jpg',
        content: ''
      },
      {
        address: 'Another St, Maui, HI 96793',
        title: 'Hawaii Job 2',
        subtitle: 'Project Paradise',
        phone: '808-987-6543',
        email: 'info@hawaiijob2.com',
        funFacts: 'This project includes eco-friendly construction methods.',
        imageUrl: 'https://www.goconstruct.org/media/ec0pubko/hbf-construction-work-on-a-redrow-site-min.jpg?anchor=center&mode=crop&width=455&height=295&rnd=132659746009270000',
        content: ''
      }
    ]
  };

export default locations;