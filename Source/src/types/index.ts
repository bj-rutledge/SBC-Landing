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

export interface MapInfoCardProps {
  title: string;
  address: string;
  contractorWebsite?: string;
  funFacts?: string;
  contractor?: string;
  sqFt?: string;
  onClose: () => void;
}