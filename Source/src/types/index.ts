/**
 * Created by BJ Rutledge
 * Date:2024-12-11
 **/

export type Location = {
   address: string;
   title: string;
   subtitle?: string;
   contractor?: string;
   sqFt?: string;
   phone?: string;
   email?: string;
   funFacts?: string;
   content?: string;
};

export interface MapInfoCard {
  title: string;
  address: string;
  contractorWebsite?: string;
  funFacts?: string;
  contractor?: string;
  framer?: string;
  sqFt?: string;
   geoLocation: {
      lat: number;
      lng: number;
   };
  onClose: () => void;
}

export interface SbcOutputData {
  "Total Exterior Linear Feet": number;
  "Total Interial Linear Feet": number;
  "Total Miles Built": number;
  "Total Square Footage": number;
}

