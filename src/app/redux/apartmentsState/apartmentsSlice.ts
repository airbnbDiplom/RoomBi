import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardBiProps } from "@/app/type/type";

type Apartments = {
  apartmentsMain: CardBiProps[];
  apartments: CardBiProps[];
};

const initialState: Apartments = {
  apartmentsMain: [],
  apartments: [],
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setApartments(state, action: PayloadAction<CardBiProps[]>) {
      if (!Array.isArray(action.payload)) {
        return state;
      }
      return {
        ...state,
        apartmentsMain: action.payload,
        apartments: action.payload,
      };
    },
    navFilter(state, action: PayloadAction<{ name: string; type: string }>) {
      const { name, type } = action.payload;
      state.apartments = state.apartmentsMain.filter((item) => {
        return item[type as keyof CardBiProps] === name;
      });
    },
  },
});

export const { setApartments, navFilter } = apartmentsSlice.actions;
export default apartmentsSlice.reducer;
