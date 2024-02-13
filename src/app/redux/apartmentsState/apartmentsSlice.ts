import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardBiProps, FullRentalItem, MarkerBi } from "@/app/type/type";

type Apartments = {
  apartmentsMain: CardBiProps[];
  apartments: CardBiProps[];
  apartmentsMap: MarkerBi[];
  fullRentalItem: FullRentalItem[];
};

const initialState: Apartments = {
  apartmentsMain: [],
  apartments: [],
  apartmentsMap: [],
  fullRentalItem: [],
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setApartments(state, action: PayloadAction<CardBiProps[]>) {
      if (!Array.isArray(action.payload)) {
        return state;
      }
      state.apartmentsMain = action.payload;
      state.apartments = action.payload;
    },
    setApartmentsMap(state, action: PayloadAction<MarkerBi[]>) {
      state.apartmentsMap = action.payload;
    },
    pushFullRentalItem(state, action: PayloadAction<FullRentalItem>) {
      state.fullRentalItem.push(action.payload);
      console.log("state.fullRentalItem", { ...state.fullRentalItem });
    },
    navFilter(state, action: PayloadAction<{ name: string; type: string }>) {
      const { name, type } = action.payload;
      state.apartments = state.apartmentsMain.filter((item) => {
        return item[type as keyof CardBiProps] === name;
      });
    },
  },
});

export const {
  setApartments,
  navFilter,
  setApartmentsMap,
  pushFullRentalItem,
} = apartmentsSlice.actions;
export default apartmentsSlice.reducer;
