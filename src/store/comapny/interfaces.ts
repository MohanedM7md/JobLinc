export interface Location {
  _id: string;
  address: string;
  city: string;
  country: string;
  primary?: boolean;
  id?: string;
}

export interface Owner {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
}

export interface Company {
  _id: string;
  id: string;
  name: string;
  phone: string;
  industry: string;
  size: string;
  type: string;
  tagline: string;
  urlSlug: string;
  workplace: string;
  owner: Owner;
  admins: Owner[];
  overview: string;
  logo: string;
  coverPhoto: string;
  founded: Date;
  website: string;
  locations: Location[];
  followers: number;
  employees: number;
  createdAt: string;
}

export interface CompanyStoreState {
  company: Company | null;
  loading: boolean;
  error: string | null;
  fetchCompany: (getCompany:(slug:string) => Company) => Promise<void>;
  resetCompany: () => void;
  updateBasicInfo: (updates: Partial<Company>) => void;
  updateLogo: (logoUrl: string) => void;
  updateCoverPhoto: (coverPhotoUrl: string) => void;
  addLocation: (newLocation: Location) => void;
  updateLocation: (locationId: string, updates: Partial<Location>) => void;
  removeLocation: (locationId: string) => void;
}
