import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ page = 1, limit = 5, filters = {} } = {}, thunkAPI) => {
    try {
      const params = {
        page,
        limit,
      };

      if (filters.location) {
        params.location = filters.location;
      }
      if (filters.transmission) {
        params.transmission = filters.transmission;
      }
      if (filters.engine) {
        params.engine = filters.engine;
      }
      if (filters.camperForm) {
        params.form = filters.camperForm;
      }

      if (filters.equipment) {
        Object.entries(filters.equipment).forEach(([key, value]) => {
          if (value === true) {
            params[key] = true;
          }
        });
      }

      const response = await api.get("/campers", { params });

      if (Array.isArray(response.data)) {
        return {
          items: response.data,
          total: response.data.length,
        };
      }

      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
