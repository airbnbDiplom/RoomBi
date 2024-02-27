"use server";

import { Booking, Payment } from "../type/type";

export const bookingFetch = async (booking: Booking, token: string) => {
  try {
    const url = process.env.NEXT_ADD_BOOKING_ID;
    console.log("url--", url);
    if (url) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          apartmentId: booking.apartmentId,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          totalPrice: booking.totalPrice,
          payment: booking.payment,
        }),
      });
      if (!res.ok) {
        return null;
      }
      const responseData = await res.json();
      console.log("putWishlists", responseData);
      return responseData;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const bookingReserve = async (token: string) => {
  try {
    const url = process.env.NEXT_GET_PAYMENT_ID;
    if (url) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData: Payment[] = await res.json();
      console.log("bookingReserve", responseData[0]);
      return responseData;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
