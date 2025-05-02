export interface CompanyInterface {
  id: string;
  logo?:string;
  name: string;
  urlSlug: string;
  type: string;
  size: string;
  industry: string;
  overview: string;
  //locations: array;
  followers: number;
  employees: number;
  createdAt: string;
}
