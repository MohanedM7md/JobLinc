import { create } from "zustand";
import { devtools } from 'zustand/middleware'

import { CompanyStoreState } from "./interfaces";
import { getCompanyBySlug, getMyCompany, getMyCompanyFollowers } from "@services/api/companyServices";

export const useCompanyStore = create<CompanyStoreState>()(devtools((set) => ({
  company: null,
  loading: true,
  error: null,
  // myFollowers: [],

  fetchCompany: async (slug) => {
    set({ loading: true, error: null });
    try {
      const response = await getCompanyBySlug(slug);
      if (!(response.status == 200)) throw new Error("Failed to fetch company");
      const data = response.data;
      console.log("data after fetch by slug: ", data);
      set({ company: data, loading: false });
      return response.data.isFollowing;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      });
    }
  },
  fetchAdminCompany: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getMyCompany();
      if (!(response.status == 200)) throw new Error("Failed to fetch company");
      const data = response.data;
      set({ company: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      });
    }
  },

  fetchCompanyFollowers: async () => {
    const response = await getMyCompanyFollowers();
    if (!(response.status == 200)) throw new Error("Failed to fetch company followers");
    set((state) => ({
      company: state.company
        ? {
            ...state.company,
            myFollowers: response.data,
          }
        : null,
    }))
  },


  resetCompany: () => set({ company: null, loading: true, error: null }),

  updateBasicInfo: (updates) =>
    set((state) => ({
      company: state.company
        ? {
            ...state.company,
            ...updates,
            owner: updates.owner || state.company.owner,
            locations: updates.locations || state.company.locations,
          }
        : null,
    })),

  updateLogo: (logoUrl) =>
    set((state) => ({
      company: state.company
        ? {
            ...state.company,
            logo: logoUrl,
          }
        : null,
    })),

  updateCoverPhoto: (coverPhotoUrl) =>
    set((state) => ({
      company: state.company
        ? {
            ...state.company,
            coverPhoto: coverPhotoUrl,
          }
        : null,
    })),

  addLocation: (newLocation) =>
    set((state) => ({
      company: state.company
        ? {
            ...state.company,
            locations: [...state.company.locations, newLocation],
          }
        : null,
    })),

  updateLocation: (locationId, updates) =>
    set((state) => ({
      company: state.company
        ? {
            ...state.company,
            locations: state.company.locations.map((loc) =>
              loc._id === locationId ? { ...loc, ...updates } : loc,
            ),
          }
        : null,
    })),

  removeLocation: (locationId) =>
    set((state) => ({
      company: state.company
        ? {
            ...state.company,
            locations: state.company.locations.filter(
              (loc) => loc._id !== locationId,
            ),
          }
        : null,
    })),
})));
