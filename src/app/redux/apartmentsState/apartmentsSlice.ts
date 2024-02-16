import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardBiProps, FullRentalItem, MarkerBi } from "@/app/type/type";

type Apartments = {
  apartmentsAll: CardBiProps[];
  apartments: CardBiProps[];
  apartmentsMap: CardBiProps[];
  countPage: number;
};

const initialState: Apartments = {
  apartmentsAll: [],
  apartments: [],
  apartmentsMap: [],
  countPage: 1,
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setApartmentsAll(state, action: PayloadAction<CardBiProps[]>) {
      state.apartmentsAll = action.payload;
      state.apartmentsMap = action.payload;
    },
    setApartments(state, action: PayloadAction<CardBiProps[]>) {
      state.apartments = action.payload;
    },
    showMap(state) {
      state.apartmentsMap = [...state.apartmentsAll];
    },
    showCard(state) {
      state.apartments = [...state.apartmentsAll.slice(0, 24)];
    },
    pushPushOnePage(state) {
      let startIndex;
      if (state.countPage === 1) {
        startIndex = state.countPage * 24;
      } else {
        startIndex = state.countPage * 6 + 24;
      }

      let tempArr;
      if (startIndex + 6 >= state.apartmentsAll.length) {
        tempArr = state.apartmentsAll.slice(state.apartments.length);
        state.apartments = [...state.apartments, ...tempArr];
      } else {
        tempArr = state.apartmentsAll.slice(startIndex, startIndex + 6);
        state.apartments = [...state.apartments, ...tempArr];
      }
      console.log("length", state.apartments.length);
      console.log("state.countPage", state.countPage);
      console.log("startIndex", startIndex);

      state.countPage++;
    },
    navFilter(
      state,
      action: PayloadAction<{ name: string; name2: string; type: string }>
    ) {
      const { name, name2, type } = action.payload;

      const result = state.apartmentsAll.filter((item) => {
        if (
          item[type as keyof CardBiProps] === name ||
          item[type as keyof CardBiProps] === name2
        ) {
          return item;
        }
      });
      state.apartments = result;
      state.apartmentsMap = result;
    },
  },
});

export const {
  setApartmentsAll,
  navFilter,
  setApartments,
  pushPushOnePage,
  showMap,
  showCard,
} = apartmentsSlice.actions;
export default apartmentsSlice.reducer;
