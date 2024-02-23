import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateBi, DateBooking } from "@/app/type/type";

// export interface Booking {
//   apartmentId: number;
//   checkInDate: DateBi;
//   checkOutDate: DateBi;
//   totalPrice: number;
// }

type reserv = {
  date: DateBooking | null;
  numberOfGuests: number;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfBabies: number;
  numberOfAnimals: number;
  totalPrice: number;
};

const initialState: reserv = {
  date: null,
  numberOfGuests: 1,
  numberOfAdults: 1,
  numberOfChildren: 0,
  numberOfBabies: 0,
  numberOfAnimals: 0,
  totalPrice: 0,
};

const reservSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setStartDate(state, action: PayloadAction<DateBi>) {
      if (state.date == null) {
        const temp: DateBooking = {
          start: action.payload,
          end: action.payload,
        };
        state.date = temp;
      }
      console.log("state1", action.payload);
      if (state.date) {
        console.log("state2");
        state.date.start = action.payload;
      }
    },
    setEndDate(state, action: PayloadAction<DateBi>) {
      if (state.date) {
        state.date.end = action.payload;
      }
    },
    setDate(state, action: PayloadAction<DateBooking | null>) {
      state.date = action.payload;
    },
    incremenAdultst(state) {
      state.numberOfAdults++;
      state.numberOfGuests++;
      if (state.numberOfGuests > 3) {
        state.totalPrice = state.totalPrice + 50;
      }
    },
    decrementAdultst(state) {
      state.numberOfAdults--;
      state.numberOfGuests--;
      if (state.numberOfGuests > 3) {
        state.totalPrice = state.totalPrice - 50;
      }
    },
  },
});

export const { setStartDate, setEndDate, setDate } = reservSlice.actions;
export default reservSlice.reducer;
