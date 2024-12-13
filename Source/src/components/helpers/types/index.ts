export type Location = {
  address: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  funFacts: string;
  imageUrl: string;
  content: string;
};

export type Locations = {
  washington: Location[];
  hawaii: Location[];
};
