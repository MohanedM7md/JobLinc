export interface LocationInput {
  locations: {
    address: string;
    city: string;
    country: string;
    primary?: boolean;
  };
}
