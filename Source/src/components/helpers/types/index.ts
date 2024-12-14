export type Location = {
  address: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  funFacts: string;
  imageSrc: string;
  content: string;
};

export type Region = "washington" | "hawaii";

export type MapInfoCard = {
  imageSrc: string;
  title: string;
  subtitle?: string;
  address: string;
  phone: string;
  email: string;
  funFacts?: string;
};
