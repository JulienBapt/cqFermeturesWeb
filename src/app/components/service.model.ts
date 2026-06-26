export interface SubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ServiceCategory {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  subCategories: SubCategory[];
}
