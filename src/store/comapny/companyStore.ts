import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CompanyStoreState } from "./interfaces";
import { getCompanyBySlug, getMyCompany } from "@services/api/companyServices";

export const useCompanyStore = create<CompanyStoreState>()((set) => ({
  company: null,
  loading: true,
  error: null,

  fetchCompany: async (slug) => {
    set({ loading: true, error: null });
    try {
      const response = await getCompanyBySlug(String(slug));
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
}));
