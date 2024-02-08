import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardBiProps } from "@/app/type/type";

type Apartments = {
  apartments: CardBiProps[];
};

const initialState: Apartments = {
  apartments: [],
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setApartments(state, action: PayloadAction<CardBiProps[]>) {
      console.log("K7777");
      if (!Array.isArray(action.payload)) {
        // Обробка помилки, якщо `payload` не є масивом
        return state;
      }
      return { ...state, apartments: action.payload };
    },
  },
});

export const { setApartments } = apartmentsSlice.actions;
export default apartmentsSlice.reducer;
