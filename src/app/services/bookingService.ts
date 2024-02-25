"use server";

import { Booking } from "../type/type";

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
      //   const responseData = await res.json();
      console.log("putWishlists", res);
      return res;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
