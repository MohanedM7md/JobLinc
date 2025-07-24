import { FollowerData } from "interfaces/userInterfaces";

export interface Location {
  _id: string;
  address: string;
  city: string;
  country: string;
  primary?: boolean;
  id?: string;
}

export interface Owner {
  id: string;
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
  myFollowers: FollowerData[];
  employees: number;
  createdAt: string;
}

export interface CompanyStoreState {
  company: Company | null;
  loading: boolean;
  error: string | null;
  fetchCompany: (slug: string) => boolean;
  fetchAdminCompany: () => Promise<void>;
  fetchCompanyFollowers: () => Promise<void>;
  resetCompany: () => void;
  updateBasicInfo: (updates: Partial<Company>) => void;
  updateLogo: (logoUrl: string) => void;
  updateCoverPhoto: (coverPhotoUrl: string) => void;
  addLocation: (newLocation: Location) => void;
  updateLocation: (locationId: string, updates: Partial<Location>) => void;
  removeLocation: (locationId: string) => void;
}
