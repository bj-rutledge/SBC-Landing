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

// export type Region = "washington" | "hawaii";

export type MapInfoCard = {
   title: string;
   subtitle?: string;
   address: string;
   contractor?: string;
   sqFt?: string;
   contractorWebsite?: string;
   funFacts?: string;
   onClose: () => void;
};
