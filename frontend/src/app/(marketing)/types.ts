export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tagline: string;
};

export type Highlight = {
  title: string;
  description: string;
  stat: string;
  suffix?: string;
};

export type JourneyMilestone = {
  id: number;
  heading: string;
  copy: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  copy: string;
  icon: string;
};
