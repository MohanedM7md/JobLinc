export interface Location {
  address: string;
  city: string;
  country: string;
  primary?: boolean;
}

export interface FormData_Interface {
  name?: string;
  phone?: string;
  urlSlug?: string;
  industry?: string;
  founded?: Date;
  size?: string;
  type?: string;
  overview?: string;
  tagline?: string;
  website?: string;
  workplace?: string;
  logo?: string;
  coverPhoto?: string;
  locations?: Location[];
}
