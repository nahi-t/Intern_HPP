export interface Department {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  responsibilities: string[];
  contact: {
    phone: string;
    email: string;
    office: string;
  };
}