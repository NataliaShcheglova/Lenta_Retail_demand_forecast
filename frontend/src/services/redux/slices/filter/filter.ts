import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
  selectedCities: string[];
  selectedVenues: string[];
  selectedGroups: string[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedSku: string[];
}

const initialState: FilterState = {
  selectedCities: [],
  selectedVenues: [],
  selectedGroups: [],
  selectedCategories: [],
  selectedSubcategories: [ ],
  selectedSku: []
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleCity: (state, action) => {
      const { city } = action.payload;
      const index = state.selectedCities.indexOf(city);
      if (index === -1) {
        state.selectedCities.push(city);
      } else {
        state.selectedCities.splice(index, 1);
      }
    },
    toggleVenue: (state, action) => {
      const { venue } = action.payload;
      const index = state.selectedVenues.indexOf(venue);
      if (index === -1) {
        state.selectedVenues.push(venue);
      } else {
        state.selectedVenues.splice(index, 1);
      }
    },
    selectAllCities: (state, action) => {
      state.selectedCities = action.payload.cities;
    },
    selectAllVenues: (state, action) => {
      state.selectedVenues = action.payload.venues;
    },
    resetFilters: (state) => {
      state.selectedCities = [];
      state.selectedVenues = [];
    },
    toggleGroup: (state, action) => {
      const { group } = action.payload;
      const index = state.selectedGroups.indexOf(group);
      if (index === -1) {
        state.selectedGroups.push(group);
      } else {
        state.selectedGroups.splice(index, 1);
      }
    },
    toggleCategory: (state, action) => {
      const { category } = action.payload;
      const index = state.selectedCategories.indexOf(category);
      if (index === -1) {
        state.selectedCategories.push(category);
      } else {
        state.selectedCategories.splice(index, 1);
      }
    },
    toggleSubcategory: (state, action) => {
      const { subcategory } = action.payload;
      const index = state.selectedSubcategories.indexOf(subcategory);
      if (index === -1) {
        state.selectedSubcategories.push(subcategory);
      } else {
        state.selectedSubcategories.splice(index, 1);
      }
    },
    toggleSku: (state, action) => {
      const { sku } = action.payload;
      const index = state.selectedSku.indexOf(sku);
      if (index === -1) {
        state.selectedSku.push(sku);
      } else {
        state.selectedSku.splice(index, 1);
      }
    },
    reset: (state) => {
      state.selectedGroups = [];
      state.selectedCategories = [];
      state.selectedSubcategories = [];
      state.selectedSku = [];
    },
    removeSelected: (state, action) => {
      state.selectedCities = state.selectedCities.filter((item) => item !== action.payload);
      state.selectedVenues = state.selectedVenues.filter((item) => item !== action.payload);
      state.selectedGroups = state.selectedGroups.filter((item) => item !== action.payload);
      state.selectedCategories = state.selectedCategories.filter((item) => item !== action.payload);
      state.selectedSubcategories = state.selectedSubcategories.filter((item) => item !== action.payload);
      state.selectedSku = state.selectedSku.filter((item) => item !== action.payload);
    },
  },
});

export const {
  toggleCity,
  toggleVenue,
  selectAllCities,
  selectAllVenues,
  resetFilters,
  toggleGroup,
  toggleCategory,
  toggleSubcategory,
  toggleSku,
  reset,
  removeSelected
} = filterSlice.actions;

export default filterSlice.reducer;